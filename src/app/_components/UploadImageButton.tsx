"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export const UploadImageButton = () => {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={() => {
        router.refresh();
      }}
    />
  );
};
