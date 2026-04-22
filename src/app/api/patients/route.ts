import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite-server";
import { Query } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

export async function GET(request: Request) {
  try {
    const { databases } = createAdminClient();

    const response = await databases.listDocuments(DATABASE_ID, "patients", [
      Query.orderDesc("$createdAt")
    ]);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
