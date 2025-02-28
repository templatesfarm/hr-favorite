import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useAppStore } from "@/store/appStore";
import { ProjectsTimelineWithAuth } from "portfolioui/hr-favorite";

export const Projects = () => {
  const {
    saveProjectAndQualificationInfo,
    portfolio: { projectsInfo, qualificationInfo },
    isLoading,
  } = usePortfolioStore();

  const { isEditing } = useAppStore();

  return (
    <ProjectsTimelineWithAuth
      isEditing={isEditing}
      saveProjectAndQualificationInfo={saveProjectAndQualificationInfo}
      projectsInfo={projectsInfo}
      qualificationInfo={qualificationInfo}
      isLoading={isLoading}
      circleClassName="bg-blue-300 dark:bg-blue-300"
      lineClassName="from-violet-800 via-blue-700"
      className="bg-white dark:bg-black"
    />
  );
};
