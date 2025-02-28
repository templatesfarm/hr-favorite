import { NextRequest, NextResponse } from "next/server";
import { getDatabaseApiInstance } from "@/lib/server/databaseUtil";

export async function GET(
  request: NextRequest,
  { params }: { params: { fileName: string } }
) {
  try {
    const { fileName } = params;
    const path = `images/${fileName}`; // Replace with the path to your file in the repository

    const databaseApi = await getDatabaseApiInstance();
    const { file, contentType } = await databaseApi.downloadFile(path);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${path.split("/").pop()}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
