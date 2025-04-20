"use client";

import { Spinner } from "@/app/components/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import ProfileMenuDropdown from "./ProfileMenuDropdown";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import AvatarFallbackImage from "public/images/avatar_fallback.avif";

enum WidgetState {
  LOADING = "loading",
  LOGGED_IN = "logged_in",
  LOGGED_OUT = "logged_out",
}

export default function ProfileHeader() {
  const { data: session } = useSession();
  const [widgetState, setWidgetState] = useState(WidgetState.LOADING);

  useEffect(() => {
    if (session) {
      setWidgetState(WidgetState.LOGGED_IN);
    } else {
      setWidgetState(WidgetState.LOGGED_OUT);
    }
  }, [session]);

  const skeleton = <Skeleton className="rounded-full h-full w-full" />;

  const loggedInContent = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-full w-full">
          <AvatarImage
            className="drop-shadow-xs"
            src={session?.user?.image || "/images/avatar_fallback.png"}
            alt="User Avatar"
          />
          <AvatarFallback delayMs={600}>{(session?.user?.name || "U")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <ProfileMenuDropdown />
    </DropdownMenu>
  );

  const loggedOutContent = <Button>Login</Button>;

  function selectWidget() {
    switch (widgetState) {
      case WidgetState.LOADING:
        return skeleton;
      case WidgetState.LOGGED_IN:
        return loggedInContent;
      case WidgetState.LOGGED_OUT:
        return loggedOutContent;
      default:
        return null;
    }
  }

  return <div className="flex items-center gap-2 h-full">{selectWidget()}</div>;
}
