import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row border-t border-gray-700 py-6 mt-8">
      <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
        Built by{" "}
        <Link
          href="https://linktr.ee/Visualcodepo"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-white hover:text-purple-400 transition-colors underline underline-offset-4"
        >
          Raihan_official0307
        </Link>
        . Follow Instagram developer{" "}
        <Link
          href="https://instagram.com/muhammad_raihan0307"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-white hover:text-pink-400 transition-colors underline underline-offset-4"
        >
          Instagram
        </Link>
      </p>
    </footer>
  );
}
