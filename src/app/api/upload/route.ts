// app/api/upload/route.ts
import { getDatabaseApiInstance } from "@/lib/server/databaseUtil";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const databaseApi = await getDatabaseApiInstance();
    const { fileName, fileUrl } = await databaseApi.uploadFileInCDN(file);

    return NextResponse.json({ fileName, fileUrl });
  } catch (err) {
    const error = err as Error;
    console.error("Error in upload route:", error);

    return NextResponse.json(
      { error: "Failed to upload file", details: error.message },
      { status: 500 }
    );
  }
}
