import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useAppStore } from "@/store/appStore";
import { useTheme } from "next-themes";
import { DockEditableWithAuth } from "portfolioui/hr-favorite";

export const Dock = () => {
  const {
    portfolio: { personalInfo },
    savePersonalInfo,
    isLoading,
  } = usePortfolioStore();
  const { isEditing } = useAppStore();
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <DockEditableWithAuth
      isEditing={isEditing}
      personalInfo={personalInfo}
      savePersonalInfo={savePersonalInfo}
      setTheme={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      theme={theme}
      isLoading={isLoading}
      isCoolModeOn
    />
  );
};
