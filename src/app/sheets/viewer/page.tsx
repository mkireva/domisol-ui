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
    <div className="min-h-screen relative overflow-hidden text-gray-800 dark:text-gray-100">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 -z-10 bg-[#f5f5f5] dark:bg-[#1a1a1a] overflow-hidden"
        aria-hidden="true"
      />

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="animate-slide-up [animation-delay:150ms] text-gray-600 dark:text-gray-300">
          <SheetProvider searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
