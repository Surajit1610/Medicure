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
      ? [Query.equal("patient_id", patient_id), Query.orderDesc("date_time")]
      : [Query.orderDesc("date_time")];

    const response = await databases.listDocuments(DATABASE_ID, "appointments", queries);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { databases } = createAdminClient();

    const response = await databases.createDocument(DATABASE_ID, "appointments", ID.unique(), {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      patient_id: body.patient_id || null,
      date_time: body.date_time,
      status: "pending",
      reason: body.reason,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
