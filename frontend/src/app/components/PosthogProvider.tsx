"use client";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

interface CSPostHogProviderProps {
  children: ReactNode;
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  const [isPosthogInitialized, setIsPosthogInitialized] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const initializePostHog = async () => {
      try {
        console.log("Fetching PostHog configuration...");
        const response = await axios.get("/api/posthog-config");

        const config = response.data;

        if (config.NEXT_PUBLIC_ENABLE_POSTHOG !== "0") {
          console.log("Posthog enabled - initializing...");
          posthog.init(config.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: config.NEXT_PUBLIC_POSTHOG_HOST,
            person_profiles: "always",
          });
          setIsPosthogInitialized(true);
        } else {
          console.log("Posthog disabled.");
        }
      } catch (error) {
        console.error("Error initializing PostHog:", error);
      } finally {
        setShouldRender(true); // Ensure rendering happens even if PostHog is disabled or errors occur
      }
    };

    initializePostHog();
  }, []);

  if (!shouldRender) {
    return null; // Optional: render a loading state if needed
  }

  if (isPosthogInitialized) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  }

  return <>{children}</>; // Render children even if PostHog is not initialized
}
