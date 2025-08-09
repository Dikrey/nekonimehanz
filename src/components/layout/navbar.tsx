"use client";

import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaBolt, FaBook, FaFilm, FaCat } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa"; // Ganti GitHub → Instagram
import { FiMoon } from "react-icons/fi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b">
      <div className="container flex w-full max-w-screen-2xl items-center justify-between">
        {/* Left Side: Logo & Brand */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-lg tracking-tight"
          >
            <FaBolt className="text-blue-500" />
            <span className="hidden sm:inline bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Nekonime
            </span>
            <span className="sm:hidden bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              NEKO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:text-primary font-medium"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Anime Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent font-medium">
                    Anime
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500/10 to-purple-600/20 p-6 no-underline outline-none transition-all hover:shadow-md"
                            href="/anime"
                          >
                            <FaCat className="size-6 text-blue-500" />
                            <div className="mb-2 mt-4 text-lg font-bold">Anime Neko Hanz</div>
                            <p className="text-sm text-muted-foreground">
                              Watch anime ad-free, fast, and free.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/anime" title="Search Anime">
                        Find your favorite anime series
                      </ListItem>
                      <ListItem href="/genres" title="Genres">
                        Explore by genre
                      </ListItem>
                      <ListItem href="/schedules" title="Schedule">
                        Weekly anime release calendar
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Comic Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent font-medium">
                    Comic
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-red-500/10 to-pink-500/20 p-6 no-underline outline-none transition-all hover:shadow-md"
                            href="/comic"
                          >
                            <FaBook className="size-6 text-red-500" />
                            <div className="mb-2 mt-4 text-lg font-bold">Nateegami</div>
                            <p className="text-sm text-muted-foreground">
                              Read manga & manhua online.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/comic" title="Browse Comics">
                        All comics in one place
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Movie Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent font-medium">
                    Movies
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500/10 to-emerald-500/20 p-6 no-underline outline-none transition-all hover:shadow-md"
                            href="/movie"
                          >
                            <FaFilm className="size-6 text-green-500" />
                            <div className="mb-2 mt-4 text-lg font-bold">Nateeflix</div>
                            <p className="text-sm text-muted-foreground">
                              Watch local, Korean, and Western movies.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/movie" title="Browse Movies">
                        Explore movie collection
                      </ListItem>
                      <ListItem href="/movie/search" title="Search Movie">
                        Find your favorite movies
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right Side: Actions & Social */}
        <div className="flex items-center space-x-2">
          {/* Mobile Sidebar Trigger */}
          <div className="flex items-center md:hidden">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-2 h-5" />
          </div>

          {/* Instagram Icon */}
          <Link
            href="https://instagram.com/muhammad_raihan0307"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400 transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </Link>

          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <IoSunny className="text-yellow-500" size={20} />
            ) : (
              <FiMoon className="text-indigo-400" size={20} />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
