"use client";
import React from "react";

import { usePortfolioStore } from "@/store/usePortfolioStore";

import { HeroEditableWithAuth } from "portfolioui/hr-favorite";
import { useAppStore } from "@/store/appStore";

export const Hero = () => {
  const {
    portfolio: { heroInfo },
    isLoading,
    saveHeroInfo,
  } = usePortfolioStore();
  const { isEditing } = useAppStore();

  return (
    <HeroEditableWithAuth
      isEditing={isEditing}
      heroInfo={heroInfo}
      saveHeroInfo={saveHeroInfo}
      isLoading={isLoading}
    />
  );
};
