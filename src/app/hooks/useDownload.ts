import { useState } from "react";

export const useDownload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async (name: string) => {
    if (!name) {
      console.log("No Resume file is uploaded");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/download/${name}`);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const contentType = response.headers.get("Content-Type") || "";
      const contentDisposition =
        response.headers.get("Content-Disposition") || "";

      let fileName = "download";
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
      if (filenameMatch && filenameMatch[1]) {
        fileName = filenameMatch[1].replace(/['"]/g, "");
      }

      // Ensure the file extension matches the content type
      const fileExtension = fileName.split(".").pop()?.toLowerCase();
      if (contentType.includes("pdf") && fileExtension !== "pdf") {
        fileName += ".pdf";
      } else if (contentType.includes("png") && fileExtension !== "png") {
        fileName += ".png";
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to download the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDownload,
    isLoading,
  };
};
