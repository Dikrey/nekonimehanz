import { Metadata } from "next/types";
import BaseLayout from "./base-layout";

export const metadata: Metadata = {
  title: "Error Segment | Otakudesu",
  description: "Otakudesu Page. Build by Raihan_official0307",
};

export default function ErrorSegment() {
  return (
    <BaseLayout>
      <div className="flex h-screen items-center justify-center text-xl font-medium">
        You have to put page number!
      </div>
    </BaseLayout>
  );
}
