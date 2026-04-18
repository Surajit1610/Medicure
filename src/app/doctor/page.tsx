"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Models, Query, ID } from "appwrite";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { databaseId, databases, storage, getFileUrl } from "@/lib/appwrite";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogOut, Check, X, FileText, UploadCloud, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Appointment extends Models.Document {
  patient_id?: string;
  name: string;
  email: string;
  phone?: string;
  date_time: string;
  status: string;
  reason: string;
}

interface RecordDoc extends Models.Document {
  patient_id: string;
  title: string;
  file_id: string;
  uploaded_by: string;
}

interface Patient extends Models.Document {
  name: string;
  email: string;
}

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [records, setRecords] = useState<RecordDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload Form State
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function init() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        // Enforce login
        router.push("/login");
        return;
      }

      if (!currentUser.labels || !currentUser.labels.includes("doctor")) {
        // Not a doctor, send to patient portal
        toast.error("Unauthorized Access", { description: "You are not authorized as a doctor." });
        router.push("/dashboard");
        return;
      }

      setUser(currentUser);
      await Promise.all([fetchAllAppointments(), fetchAllPatients(), fetchAllRecords()]);
      setLoading(false);
    }
    init();
  }, [router]);

  async function fetchAllAppointments() {
    try {
      const res = await databases.listDocuments(databaseId, "appointments", [Query.orderDesc("date_time")]);
      setAppointments(res.documents as unknown as Appointment[]);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAllPatients() {
    try {
      const res = await databases.listDocuments(databaseId, "patients", [Query.orderDesc("$createdAt")]);
      setPatients(res.documents as unknown as Patient[]);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAllRecords() {
    try {
      const res = await databases.listDocuments(databaseId, "records", [Query.orderDesc("$createdAt")]);
      setRecords(res.documents as unknown as RecordDoc[]);
    } catch (error) {
      console.error(error);
    }
  }

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      await databases.updateDocument(databaseId, "appointments", id, { status });
      toast.success(`Appointment marked as ${status}`);
      fetchAllAppointments();
    } catch (error: any) {
      toast.error("Failed to update status", { description: error.message });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!selectedPatientId || !fileTitle) {
      toast.error("Please select a patient and enter a title.");
      return;
    }

    setUploading(true);
    try {
      const uploadedFile = await storage.createFile("medical_records", ID.unique(), file);
      await databases.createDocument(databaseId, "records", ID.unique(), {
        patient_id: selectedPatientId,
        title: fileTitle,
        file_id: uploadedFile.$id,
        uploaded_by: "doctor",
      });
      toast.success("Record shared with patient!");
      setFileTitle("");
      setSelectedPatientId("");
      fetchAllRecords();
    } catch (error: any) {
      toast.error("Upload failed", { description: error.message });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-xl">Loading Doctor Portal...</div>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Doctor Admin Portal</h1>
          <p className="text-muted-foreground">Manage appointments and patient records.</p>
        </div>
        <Button variant="ghost" onClick={async () => { await logoutUser(); router.push("/"); }}>
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Incoming Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((appt) => (
                <Card key={appt.$id}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {new Date(appt.date_time).toLocaleString()} - {appt.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          <strong>Email:</strong> {appt.email} {appt.phone && `| Phone: ${appt.phone}`}<br />
                          <strong>Reason:</strong> {appt.reason}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {appt.status === "pending" && (
                          <>
                            <Button size="icon" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => updateAppointmentStatus(appt.$id, "confirmed")}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => updateAppointmentStatus(appt.$id, "rejected")}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase self-center ${
                          appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              {appointments.length === 0 && <p className="text-muted-foreground">No appointments found.</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 mt-8 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> All Patient Records
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.map((rec) => (
                <Card key={rec.$id} className="cursor-pointer hover:bg-muted/50"
                  onClick={() => window.open(getFileUrl("medical_records", rec.file_id), "_blank")}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium truncate">{rec.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        By {rec.uploaded_by} • For Patient ID: {rec.patient_id.substring(0,6)}...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {records.length === 0 && <p className="text-muted-foreground">No records uploaded yet.</p>}
            </div>
          </section>
        </div>

        {/* Right Column: Upload Tool */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary" /> Issue Prescription
              </CardTitle>
              <CardDescription>Upload files specifically securely to a patient.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Patient</label>
                <select 
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                >
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => (
                     <option key={p.$id} value={p.$id}>{p.name} ({p.email})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Document Title</label>
                <Input 
                  placeholder="e.g. Prescription - 12 Oct" 
                  value={fileTitle}
                  onChange={(e) => setFileTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2 pt-2">
                <Input 
                  type="file" 
                  disabled={uploading || !selectedPatientId || !fileTitle}
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                {uploading && <p className="text-xs text-muted-foreground mt-2">Uploading safely to bucket...</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
