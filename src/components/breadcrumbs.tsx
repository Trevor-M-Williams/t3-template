"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Breadcrumbs() {
  const pathname = usePathname();
  const pathnameSegments = pathname.split("/").filter(Boolean);

  const createBreadcrumbPath = (index: number) => {
    return "/" + pathnameSegments.slice(0, index + 1).join("/");
  };

  return (
    <nav className="mt-8 flex text-lg text-gray-600" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {pathnameSegments.map((segment, index) => {
          const isLast = index === pathnameSegments.length - 1;
          const path = createBreadcrumbPath(index);

          return (
            <React.Fragment key={index}>
              {isLast ? (
                <span className="capitalize">
                  {segment.replaceAll("-", " ")}
                </span>
              ) : (
                <>
                  <Link href={path} className="capitalize hover:underline">
                    {segment.replaceAll("-", " ")}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
