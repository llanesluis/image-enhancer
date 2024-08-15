"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { CreditCard, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function User() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback className="animate-pulse"></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-60">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="animate-pulse"></AvatarFallback>
          </Avatar>
          <p className="text-sm">{user?.fullName}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={"/user-profile"}>
            <div className="flex">
              <Settings className="mr-2 size-4" />
              <span>Administrar cuenta</span>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={"/"}>
            <div className="flex">
              <CreditCard className="mr-2 size-4" />
              <span>Subscripción</span>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="w-fit">
          <SignOutButton>
            <div className="flex gap-2">
              <LogOut className="size-4" />
              Cerrar sesión
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
