export default function Page() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-background dark:bg-background overflow-hidden"
        aria-hidden="true"
      />
      <main className="flex-grow">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
          User
        </div>
      </main>
    </div>
  );
}
