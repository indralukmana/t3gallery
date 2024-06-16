// app/providers.js
"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, { useEffect } from "react";
import { env } from "~/env";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
        name: userInfo.user.fullName,
      });
      console.log({ info: userInfo.user });
    } else if (!auth.isSignedIn) {
      posthog.reset();
    }
  }, [userInfo.user, auth.isSignedIn]);

  return <>{children}</>;
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}
