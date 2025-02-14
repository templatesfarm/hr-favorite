import { PortfolioType } from "@/store/usePortfolioStore";
import { serverRoutes } from "../contants";
import { headers } from "next/headers";

export const getBaseUrl = (domain: string) => {
  return `${domain.includes("localhost") ? "http" : "https"}://${domain}`;
};

interface PortfolioSeoType {
  portfolio: PortfolioType;
  url: string;
  error: string;
}

export async function fetchPortfolioDetails() {
  try {
    const headersList = headers();
    const domain = headersList.get("host") || "";
    const baseUrl = getBaseUrl(domain) || "";
    const response = await fetch(`${baseUrl}${serverRoutes.PORTFOLIO}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
    });

    const data = await response.json();
    if (response.ok) {
      return {
        portfolio: data as PortfolioType,
        url: baseUrl,
        error: "",
      } as PortfolioSeoType;
    } else {
      return {
        portfolio: {} as PortfolioType,
        url: baseUrl,
        error: data?.error || "Error fetching portfolio",
      };
    }
  } catch (err) {
    const error = err as Error;
    return {
      portfolio: {} as PortfolioType,
      error: error.message,
      url: "",
    };
  }
}
