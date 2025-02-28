import { Metadata } from "next";
import HomePage from "./HomePage";
import { fetchPortfolioDetails } from "@/lib/server/fetchPortfolio.service";

export async function generateMetadata({}): Promise<Metadata> {
  const { portfolio, url } = await fetchPortfolioDetails();
  if (portfolio?.personalInfo?.name) {
    return {
      title: `${portfolio.personalInfo.name} | Portfolio`,
      description: portfolio.heroInfo.description,
      keywords: `${portfolio.personalInfo.name} Portfolio`,
      alternates: {
        canonical: url,
      },
    };
  }

  return {
    title: "Portfolio",
    description: "Portfolio of a developer",
    keywords: "Portfolio, Developer",
  };
}

export default async function Page() {
  const { portfolio, url, error } = await fetchPortfolioDetails();

  if (!!error) {
    return (
      <div className="text-center mx-fit mx-auto">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }
  return <HomePage portfolio={portfolio} url={url} />;
}
