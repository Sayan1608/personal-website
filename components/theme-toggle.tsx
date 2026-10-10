"use client";

import { useSyncExternalStore } from "react";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribeToNothing = () => () => {};
const getMountedSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToNothing, getMountedSnapshot, getServerSnapshot);

  const isDark = mounted && resolvedTheme === "dark";
  const Icon = !mounted ? LaptopMinimal : isDark ? Sun : Moon;

  return (
    <button
      aria-label={!mounted ? "Toggle color theme" : `Switch to ${isDark ? "light" : "dark"} mode`}
      className="icon-button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
    </button>
  );
}
