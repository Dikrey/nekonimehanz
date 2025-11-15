import Navbar from "./navbar";
import Footer from "./footer";

import { AppSidebar } from "./app-sidebar";
import {
  SidebarProvider,
  SidebarInset
} from "@/components/ui/sidebar";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function BaseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>

        <Navbar />

        {/* ALERT GLOBAL */}
        <div className="mx-4 mt-4">
          <Alert className="border-l-4 border-blue-500 rounded-xl shadow-md">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-semibold">Informasi Update</AlertTitle>
            <AlertDescription className="text-sm">
             Aplikasi telah menerima pembaruan terbaru dan server kini berjalan normal.
            </AlertDescription>
          </Alert>
        </div>

        {children}

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
