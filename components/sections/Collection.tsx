"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";
import { TransformationTypeKey } from "@/types/transformation";
import { transformationsTypes } from "@/constants/transformations";
import { Search } from "./Search";

interface CollectionProps {
  hasSearch?: boolean;
  images: IImage[];
  totalPages?: number;
  page: number;
}

export default function Collection({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: CollectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const handlePageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="min-w-[400px] text-3xl font-bold">
          Últimas transformaciones
        </h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 ">
          {images.map((image) => (
            <CollectionCard image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="flex-center border-dark-400/10 h-60 w-full rounded-[10px] border bg-white/20">
          <p className="font-semibold">No se encontraron resultados</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="button w-32 bg-accentcolor bg-cover text-white"
              onClick={() => handlePageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button bg-purple-gradient w-32 bg-cover text-white"
              onClick={() => handlePageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

function CollectionCard({ image }: { image: IImage }) {
  return (
    <li>
      <Link
        href={`/transformations/${image._id}`}
        className="flex flex-1 cursor-pointer flex-col gap-5 rounded-[16px] border-2 border-accentcolor/10 bg-background p-4 shadow-md transition-all hover:shadow-accentcolor/10"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex items-center justify-between">
          <p className="mr-3 line-clamp-1 font-semibold">{image.title}</p>
          <Image
            src={`/assets/icons/${
              transformationsTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  );
}
