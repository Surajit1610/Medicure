import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite-server";
import { Query, ID, Permission, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

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
    const formData = await request.formData();
    const patient_id = formData.get("patient_id") as string;
    const title = formData.get("title") as string;
    const uploaded_by = formData.get("uploaded_by") as string;
    const file = formData.get("file") as File;

    if (!file) throw new Error("No file provided");

    const { databases, storage } = createAdminClient();

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileToUpload = InputFile.fromBuffer(buffer, file.name);

    const uploadedFile = await storage.createFile(
      "medical_records", 
      ID.unique(), 
      fileToUpload,
      [
        Permission.read(Role.any()),
      ]
    );

    const response = await databases.createDocument(DATABASE_ID, "records", ID.unique(), {
      patient_id,
      title,
      file_id: uploadedFile.$id,
      uploaded_by,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
