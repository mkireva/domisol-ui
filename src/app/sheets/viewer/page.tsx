import SheetProvider from "../SheetProvider";
import { Params } from "next/dist/server/request/params";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SheetViewer(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 -z-10 bg-background overflow-hidden"
        aria-hidden="true"
      />

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="animate-slide-up [animation-delay:150ms] text-muted-foreground">
          <SheetProvider searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
