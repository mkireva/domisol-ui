import SheetProvider from '../SheetProvider';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Music4 } from "lucide-react";
import { Params } from 'next/dist/server/request/params';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SheetViewer(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl animate-float animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float [animation-delay:2s] animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl animate-float [animation-delay:4s] animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4 sm:mb-6 animate-slide-up">
          <Button variant="outline" size="sm" asChild className="group">
            <Link href="/sheets" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <Music4 className="h-4 w-4" />
              Back to Collection
            </Link>
          </Button>
        </div>
        <div className="animate-slide-up [animation-delay:150ms]">
          <SheetProvider searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
