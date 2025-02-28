"use client";

import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useAppStore } from "@/store/appStore";
import { AchievementEditableWithAuth } from "portfolioui/hr-favorite";

export const Achievements = () => {
  const {
    portfolio: { achievementsInfo },
    saveAchievementsInfo,
    isLoading,
  } = usePortfolioStore();
  const { isEditing } = useAppStore();
  return (
    <AchievementEditableWithAuth
      isEditing={isEditing}
      achievementsInfo={achievementsInfo}
      saveAchievementsInfo={saveAchievementsInfo}
      isLoading={isLoading}
    />
  );
};
