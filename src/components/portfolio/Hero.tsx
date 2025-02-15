"use client";
import React from "react";
import { useAppStore } from "@/store/appStore";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { HeroEditableWithAuth } from "portfolioui/hr-favorite";

export const Hero = () => {
  const { portfolio, saveHeroInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  return (
    <HeroEditableWithAuth
      isEditing={isEditing}
      heroInfo={portfolio.heroInfo}
      saveHeroInfo={saveHeroInfo}
      isLoading={isLoading}
    />
  );
};
