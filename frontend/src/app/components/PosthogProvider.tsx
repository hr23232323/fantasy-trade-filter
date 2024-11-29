"use client";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
export const dynamic = "force-dynamic"; // Tell NextJS to make this dynamic

interface CSPostHogProviderProps {
  children: ReactNode;
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  const [isPosthogInitialized, setIsPosthogInitialized] = useState(false);

  useEffect(() => {
    const initializePostHog = async () => {
      try {
        const response = await axios.get("/api/posthog-config");

        const config = response.data;

        if (config.ENABLE_POSTHOG !== "0") {
          posthog.init(config.POSTHOG_KEY, {
            api_host: config.POSTHOG_HOST,
            person_profiles: "always",
          });
          setIsPosthogInitialized(true);
        }
      } catch (error) {
        console.error("Error initializing PostHog:", error);
      }
    };

    initializePostHog();
  }, []);

  // Always render children immediately to avoid hydration errors
  if (isPosthogInitialized) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  }

  // Render children without PostHog if not initialized yet
  return <>{children}</>;
}
