"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";

export default function ProfileMenuDropdown() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenuContent className="w-56 m-2">
      <DropdownMenuGroup>
        <DropdownMenuItem onSelect={() => router.push("/profile")}>Profile</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuItem onSelect={() => handleLogout()}>Log out</DropdownMenuItem>
    </DropdownMenuContent>
  );
}
