import { usePortfolioStore } from "@/store/usePortfolioStore";

import { ContactViewWithAuth } from "portfolioui/hr-favorite";

export default function Footer() {
  const { portfolio, isLoading } = usePortfolioStore();
  const { personalInfo } = portfolio;

  if (isLoading) {
    return <></>;
  }

  return (
    <ContactViewWithAuth
      email={personalInfo.email}
      phoneNumber={personalInfo.contactNumber}
    />
  );
}
