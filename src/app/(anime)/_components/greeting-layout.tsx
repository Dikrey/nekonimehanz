import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function GreetingLayout() {
  return (
    <section className="pt-10">
      <div className="mx-auto max-w-7xl px-12">
        <div className="mx-auto w-full text-left md:w-11/12 md:text-center xl:w-9/12">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
            <span>Discover the magic of&nbsp;</span>
            <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text py-2 text-transparent lg:inline">
              Anime Like Never Before
            </span><br></br>
           <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text py-2 text-transparent lg:inline">
            NEKONIMEHANZ
          </span>
          </h1>

          <p className="mb-8 text-lg font-medium text-foreground/90 md:text-xl lg:px-16">
            Dive into a vast collection of anime, handpicked and streamed with love. 
            Built by fans, for fans — <strong>ad-free, fast, and free</strong>.
          </p>

          <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row md:mb-10">
            <Link
              href="#started"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500/20 px-6 py-3 text-lg font-semibold text-blue-700 backdrop-blur-sm transition-all hover:bg-blue-500/30 hover:shadow-lg hover:shadow-blue-300/40 dark:text-blue-400 dark:hover:shadow-blue-500/20 sm:w-auto"
            >
              <span>Get Started</span>
              <FaArrowRight />
            </Link>
            <Link
              href="/anime"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-100 px-6 py-3 text-lg font-semibold text-gray-800 transition-all hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-300/50 dark:bg-gray-700/60 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:shadow-gray-500/20 sm:w-auto"
            >
              <span>Explore Anime</span>
              <FaSearch />
            </Link>
          </div>

          {/* Kredit Pembuat – Tetap estetik dan menyatu */}
          <p className="mt-10 text-center text-sm font-light text-gray-500 dark:text-gray-400">
            Crafted with passion by{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-300">Raihan_official0307</span>{" "}
            &{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-300">Visualcodepo</span>
          </p>
        </div>
      </div>
    </section>
  );
}
