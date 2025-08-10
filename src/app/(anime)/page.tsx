import BaseLayout from "@/components/layout/base-layout";
import HomeLayout from "@/app/(anime)/_components/home-layout";
import GreetingLayout from "@/app/(anime)/_components/greeting-layout";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Home | Nekonimehanz",
  description: "Home Page Nekonimehanz. Build by Raihan_official0307",
};

export default function Home() {
  return (
    <BaseLayout>
      <GreetingLayout />
      <HomeLayout />
    </BaseLayout>
  );
}
