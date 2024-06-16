"use client";

import { useAuth } from "@clerk/nextjs";
import posthog from "posthog-js";
import type React from "react";
import { useUploadThing } from "~/utils/uploadthing";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);
  const auth = useAuth();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    posthog.capture("upload image", { userEmail: auth.userId });

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log({ result });
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },

    isUploading: $ut.isUploading,
  };
};

export const SimpleUploadButton = () => {
  const { inputProps } = useUploadThingInputProps("imageUploader");

  return (
    <div>
      <label htmlFor="upload-button">Upload</label>
      <input
        type="file"
        id="upload-button"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
};
