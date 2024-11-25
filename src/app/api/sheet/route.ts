import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/xml, text/xml, */*',
        'User-Agent': 'Mozilla/5.0 (compatible; DomisolApp/1.0;)',
        'Origin': 'https://opensheetmusicdisplay.github.io',
        'Referer': 'https://opensheetmusicdisplay.github.io/'
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const musicXML = await response.text();
    if (!musicXML || musicXML.trim().length === 0) {
      throw new Error('Received empty response');
    }

    // Verify it looks like XML
    if (!musicXML.includes('<?xml') && !musicXML.includes('<score-partwise')) {
      throw new Error('Invalid MusicXML content');
    }

    // Return the XML with proper content type
    return new NextResponse(musicXML, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*'
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
