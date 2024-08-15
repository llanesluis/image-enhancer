"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex cursor-pointer items-center gap-2"
    >
      <MoveLeft className=" h-6 w-6" />
      <span>Go back</span>
    </button>
  );
}
