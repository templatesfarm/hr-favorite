import { create } from "zustand";
import { serverRoutes } from "@/lib/contants";
import {
  HeroType,
  PersonalInfoType,
  ProjectsTimelineInfoType,
  QualificationInfoType,
  SkillsSlidersType,
} from "portfolioui/types";
import {
  initialQualificationState,
  initialProjectState,
  initialPersonalState,
  initialHeroState,
  initialSkillsState,
} from "portfolioui/state";

export interface PortfolioType {
  personalInfo: PersonalInfoType;
  heroInfo: HeroType;
  skillsInfo: SkillsSlidersType;
  projectsInfo: ProjectsTimelineInfoType;
  qualificationInfo: QualificationInfoType;
}

interface PortfolioStore {
  portfolio: PortfolioType;
  isLoading: boolean;
  error: string;
  savePortfolio: (x: PortfolioType) => void;
  savePersonalInfo: (x: PersonalInfoType) => void;
  saveHeroInfo: (x: HeroType) => void;
  saveProjectsInfo: (x: ProjectsTimelineInfoType) => void;
  saveSkillsInfo: (x: SkillsSlidersType) => void;
  saveProjectAndQualificationInfo: (
    x: ProjectsTimelineInfoType,
    y: QualificationInfoType
  ) => void;
  updateState: (x: PortfolioType) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  portfolio: {
    personalInfo: initialPersonalState,
    heroInfo: initialHeroState,
    skillsInfo: initialSkillsState,
    projectsInfo: initialProjectState,
    qualificationInfo: initialQualificationState,
  },
  isLoading: true,
  error: "",

  savePortfolio: async (portfolioData: PortfolioType) => {
    set({ isLoading: true });
    try {
      const response = await fetch(serverRoutes.PORTFOLIO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });
      if (response.ok) {
        const data = await response.json();
        set({
          portfolio: data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, error: "Failed to Save Portfolio Info" });
      }
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  savePersonalInfo: async (personalInfo: PersonalInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      personalInfo,
    } as PortfolioType);
  },

  saveHeroInfo: async (heroInfo: HeroType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      heroInfo,
    } as PortfolioType);
  },

  saveSkillsInfo: async (skillsInfo: SkillsSlidersType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      skillsInfo,
    } as PortfolioType);
  },

  saveProjectsInfo: async (projectsInfo: ProjectsTimelineInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      projectsInfo,
    } as PortfolioType);
  },

  saveQualificationInfo: async (qualificationInfo: QualificationInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      qualificationInfo,
    } as PortfolioType);
  },

  saveProjectAndQualificationInfo: async (
    projectsInfo: ProjectsTimelineInfoType,
    qualificationInfo: QualificationInfoType
  ) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      projectsInfo,
      qualificationInfo,
    } as PortfolioType);
  },

  updateState: (newState: PortfolioType) => {
    set({
      portfolio: newState,
      isLoading: false,
      error: "",
    });
  },
}));
