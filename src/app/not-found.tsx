import Image from "next/image";

export const metadata = {
  title: "404 - Page Not Found",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
        <div className="mx-auto py-2 flex flex-col justify-center items-center gap-4">

      <h2 className="text-2xl">Seite nicht gefunden</h2>
      <Image
        className="m-0 rounded-xl"
        src={"/images/not-found-1024x1024.png"}
        alt="404 not found"
        width={300}
        height={300}
        sizes="300px"
        priority={true}
        title="Page not found"
        />
        </div>
    </div>
  );
}
