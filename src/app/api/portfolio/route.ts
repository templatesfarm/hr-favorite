import { databaseRoutes } from "@/lib/contants";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getDatabaseApiInstance } from "@/lib/server/databaseUtil";

export const POST = async (req: NextRequest) => {
  const porfolioData = await req.json();

  if (!porfolioData) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const databaseInstance = await getDatabaseApiInstance();
    // Update the file in the repository
    await databaseInstance.createOrUpdateData(
      databaseRoutes.PORTFOLIO,
      porfolioData
    );

    // Fetch the updated content
    const parsedContent = await databaseInstance.fetchFileContentFromDatabase(
      databaseRoutes.PORTFOLIO
    );

    revalidatePath("/api/portfolio");
    return NextResponse.json(parsedContent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const databaseApi = await getDatabaseApiInstance();
    const parsedContent = await databaseApi.fetchFileContentFromDatabase(
      databaseRoutes.PORTFOLIO
    );
    return NextResponse.json(parsedContent, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error fetching hero info:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
