import { Fragment } from "react";
import ProfileHeader from "./components/ProfileHeader";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <header className="h-16">
        <div className="flex items-center justify-between h-full px-4 py-2">
          <h1 className="font-semibold">Court Master</h1>
          <ProfileHeader />
        </div>
      </header>

      <div className="grow w-full flex items-center justify-center">{children}</div>

      <div>
        <p className=" m-2 text-xs text-muted-foreground font-medium">Build v0.0.1b</p>
      </div>
    </Fragment>
  );
}
