import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite-server";
import { Query, ID } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patient_id = searchParams.get("patient_id");
    const { databases } = createAdminClient();

    const queries = patient_id 
      ? [Query.equal("patient_id", patient_id), Query.orderDesc("$createdAt")]
      : [Query.orderDesc("$createdAt")];

    const response = await databases.listDocuments(DATABASE_ID, "records", queries);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { databases } = createAdminClient();

    const response = await databases.createDocument(DATABASE_ID, "records", ID.unique(), {
      patient_id: body.patient_id,
      title: body.title,
      file_id: body.file_id,
      uploaded_by: body.uploaded_by,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
