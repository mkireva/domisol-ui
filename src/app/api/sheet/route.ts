import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/xml, text/xml, */*',
              'User-Agent': 'Mozilla/5.0 (compatible; DomisolApp/1.0;)',
              'Origin': '*',
              'Referer': request.headers.get('referer') || 'https://opensheetmusicdisplay.github.io/',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          });
          
          if (response.ok) return response;
          
          if (response.status === 404) {
            throw new Error('Sheet music not found');
          }
          
          if (i === retries - 1) {
            throw new Error(`Failed to fetch after ${retries} attempts`);
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        } catch (error) {
          if (i === retries - 1) throw error;
        }
      }
      throw new Error('Failed to fetch sheet music');
    };

    const response = await fetchWithRetry(url);
    const musicXML = await response.text();
    
    if (!musicXML || musicXML.trim().length === 0) {
      throw new Error('Received empty response');
    }

    // Enhanced XML validation
    const isValidXML = (content: string): boolean => {
      const hasXMLDeclaration = content.includes('<?xml');
      const hasMusicXMLElements = [
        '<score-partwise',
        '<movement-title',
        '<part-list',
        '<part',
        '<measure'
      ].some(tag => content.includes(tag));
      
      return hasXMLDeclaration && hasMusicXMLElements;
    };

    if (!isValidXML(musicXML)) {
      throw new Error('Invalid MusicXML content: missing required elements');
    }

    // Return the XML with enhanced caching and security headers
    return new NextResponse(musicXML, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
      }
    });
  } catch (error) {
    console.error('Error fetching sheet music:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch sheet music' },
      { status: 500 }
    );
  }
}
