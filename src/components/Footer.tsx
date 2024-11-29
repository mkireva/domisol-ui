import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 bg-[#f5f5f5] dark:bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Link
            href="https://www.kireva.de/"
            className="text-sm text-grey-800 text-semibold transition-colors hover:text-primary dark:hover:text-primary/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              &copy; {new Date().getFullYear()} domisol.eu
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
