"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { GalleryVerticalEnd, Minus, Plus, Home, Search, List, Calendar, BookOpen, Film, Compass } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const isUrlActive = (url: string, pathname: string) => {
  const cleanUrl = url.replace(/#.*$/, "");
  const cleanPathname = pathname.replace(/#.*$/, "");
  return cleanUrl === cleanPathname;
};

const data = {
  navMain: [
    {
      title: "Anime",
      icon: Compass,
      items: [
        { title: "Home", url: "/", icon: Home },
        { title: "Search Anime", url: "/anime", icon: Search },
        { title: "Genres List", url: "/genres", icon: List },
        { title: "Schedules List", url: "/schedules", icon: Calendar },
      ],
    },
    {
      title: "Comic",
      icon: BookOpen,
      items: [
        { title: "Home", url: "/comic", icon: Home },
      ],
    },
    {
      title: "Movie",
      icon: Film,
      items: [
        { title: "Home", url: "/movie", icon: Home },
        { title: "Search Movie", url: "/movie/search", icon: Search },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const hasActiveChild = (items: Array<{ url: string }>) => {
    return items.some((item) => isUrlActive(item.url, pathname));
  };

  return (
    <Sidebar {...props} className="bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl border-r border-gray-700">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-white/20 p-2">
                  <GalleryVerticalEnd className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">Neko Anime Hanz</span>
                  <span className="text-xs text-gray-200">v2.5.1</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.items && hasActiveChild(item.items)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-white/10 transition-all rounded-lg px-3 py-2">
                      <item.icon className="mr-2 size-4" />
                      {item.title}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isUrlActive(sub.url, pathname)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                                isUrlActive(sub.url, pathname)
                                  ? "bg-purple-500/30 text-purple-300"
                                  : "hover:bg-white/5 text-gray-300 hover:text-white"
                              }`}
                            >
                              <a href={sub.url} className="flex items-center gap-2">
                                <sub.icon className="size-4" />
                                {sub.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
