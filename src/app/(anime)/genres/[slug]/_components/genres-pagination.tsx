import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationProps } from "@/types/pagination";

export default function GenresPagination({
  animeData,
  genreName,
}: Readonly<{
  animeData: PaginationProps;
  genreName: string | null | undefined;
}>) {
  if (!animeData || !genreName) {
    return null;
  }

  const { current_page, last_visible_page, has_previous_page, has_next_page } = animeData;

  const totalPages = Math.max(last_visible_page, 1);
  const nextPageEnabled = has_next_page && current_page < totalPages;
  const prevPageEnabled = has_previous_page && current_page > 1;

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, current_page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getPageNumbers();

  return (
    <Pagination className="mt-8">
      <PaginationContent className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {/* Previous Button */}
        <PaginationItem>
          {prevPageEnabled ? (
            <PaginationPrevious
              href={`/genres/${genreName}/?page=${current_page - 1}`}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 dark:from-purple-600 dark:to-blue-700"
            />
          ) : (
            <span
              aria-hidden="true"
              className="pointer-events-none block rounded-md px-3 py-1.5 text-sm text-muted-foreground opacity-50"
            >
              Previous
            </span>
          )}
        </PaginationItem>

        {/* First Page */}
        {visiblePages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={`/genres/${genreName}/?page=1`}>
                1
              </PaginationLink>
            </PaginationItem>
            {visiblePages[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Visible Page Numbers */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`/genres/${genreName}/?page=${page}`}
              isActive={page === current_page}
              className={page === current_page
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-purple-600"
                : "hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900/30"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Last Page */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={`/genres/${genreName}/?page=${totalPages}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Dropdown for All Pages (Hidden on large screens) */}
        <PaginationItem className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <PaginationEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="max-h-80 overflow-y-auto p-3"
            >
              <DropdownMenuLabel className="text-center font-semibold">
                Go to Page
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-4 gap-2 pt-2">
                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Link key={page} href={`/genres/${genreName}/?page=${page}`}>
                      <DropdownMenuItem
                        className={`flex h-8 cursor-pointer items-center justify-center rounded-md text-sm transition-colors ${
                          page === current_page
                            ? "bg-purple-500 text-white"
                            : "hover:bg-purple-100 dark:hover:bg-purple-900/30"
                        }`}
                      >
                        {page}
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </PaginationItem>

        {/* Next Button */}
        <PaginationItem>
          {nextPageEnabled ? (
            <PaginationNext
              href={`/genres/${genreName}/?page=${current_page + 1}`}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-cyan-700"
            />
          ) : (
            <span
              aria-hidden="true"
              className="pointer-events-none block rounded-md px-3 py-1.5 text-sm text-muted-foreground opacity-50"
            >
              Next
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
