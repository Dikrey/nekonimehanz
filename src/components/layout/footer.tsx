import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built by&nbsp;
        <Link
          href="https://linktr.ee/RaihanDIkrey"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Raihan_official0307
        </Link>
        .&nbsp;Follow my Instagram &nbsp;
        <Link
          href="https://instagram.com/muhammad_raihan0307"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Instagram
        </Link>
      </p>
    </footer>
  );
}
