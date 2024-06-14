import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { UploadImageButton } from "~/app/_components/UploadImageButton";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <p>Gallery</p>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadImageButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
