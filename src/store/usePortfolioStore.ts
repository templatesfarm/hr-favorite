import { create } from "zustand";
import {
  HeroType,
  PersonalInfoType,
  ProjectsTimelineInfoType,
  QualificationInfoType,
  AchievementsInfoType,
  SkillsInfoType,
} from "portfolioui/types";
import {
  initialQualificationState,
  initialProjectState,
  initialPersonalState,
  initialHeroState,
  initialSkillsState,
  initialAchievementState,
} from "portfolioui/state";
import { serverRoutes } from "@/lib/constants";

export interface PortfolioType {
  personalInfo: PersonalInfoType;
  heroInfo: HeroType;
  skillsInfo: SkillsInfoType;
  projectsInfo: ProjectsTimelineInfoType;
  qualificationInfo: QualificationInfoType;
  achievementsInfo: AchievementsInfoType;
}

interface PortfolioStore {
  portfolio: PortfolioType;
  isLoading: boolean;
  error: string;
  savePortfolio: (x: PortfolioType) => void;
  savePersonalInfo: (x: PersonalInfoType) => void;
  saveHeroInfo: (x: HeroType) => void;
  saveProjectsInfo: (x: ProjectsTimelineInfoType) => void;
  saveSkillsInfo: (x: SkillsInfoType) => void;
  saveAchievementsInfo: (x: AchievementsInfoType) => void;
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
    achievementsInfo: initialAchievementState,
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

  saveSkillsInfo: async (skillsInfo: SkillsInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      skillsInfo,
    } as PortfolioType);
  },

  saveAchievementsInfo: async (achievementsInfo: AchievementsInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      achievementsInfo,
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
