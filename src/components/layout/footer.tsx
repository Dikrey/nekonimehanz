import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-6 text-gray-300">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        
        {/* Left text */}
        <p className="text-center text-sm md:text-left">
          Built with ❤️ by{" "}
          <Link
            href="https://linktr.ee/RaihanDIkrey"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Raihan_official0307
          </Link>
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <Link
            href="https://instagram.com/muhammad_raihan0307"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-4 w-4"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
            </svg>
            Instagram
          </Link>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
