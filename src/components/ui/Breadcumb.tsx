import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./breadcrumb";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbProps {
  title?: string;
}

export function DynamicBreadcrumb({ title }: BreadcrumbProps) {
  const location = useLocation();

  // Pisahkan path menjadi array
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x)
    .map(
      (path) => path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ")
    );

  // Fungsi untuk membuat URL
  const createPath = (index: number) =>
    `/${pathnames
      .slice(0, index + 1)
      .join("/")
      .toLowerCase()}`;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Dynamic Breadcrumb Items */}
        {pathnames.map((path, index) => {
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{title || path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={createPath(index)}>{path}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
