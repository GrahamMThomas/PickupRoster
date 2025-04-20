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
          <h1>Court Master</h1>
          <ProfileHeader />
        </div>
      </header>

      <div className="grow w-full flex items-center justify-center">{children}</div>

      <footer>
        <p>Build: v1.0.0</p>
      </footer>
    </Fragment>
  );
}
