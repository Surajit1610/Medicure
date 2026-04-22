"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Models, ID } from "appwrite";
import axios from "axios";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { storage, getFileUrl } from "@/lib/appwrite";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogOut, FileText, UploadCloud, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Appointment extends Models.Document {
  patient_id: string;
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

export default function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<RecordDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fileTitle, setFileTitle] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }
      
      if (currentUser.labels && currentUser.labels.includes("doctor")) {
        // Redirect doctor to their portal
        router.push("/doctor");
        return;
      }

      setUser(currentUser);
      await Promise.all([fetchAppointments(currentUser.$id), fetchRecords(currentUser.$id)]);
      setLoading(false);
    }
    fetchUser();
  }, [router]);

  async function fetchAppointments(userId: string) {
    try {
      const res = await axios.get(`/api/appointments?patient_id=${userId}`);
      setAppointments(res.data.documents as unknown as Appointment[]);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchRecords(userId: string) {
    try {
      const res = await axios.get(`/api/records?patient_id=${userId}`);
      setRecords(res.data.documents as unknown as RecordDoc[]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!fileTitle) {
      toast.error("Please enter a title for the file first.");
      return;
    }

    setUploading(true);
    try {
      const uploadedFile = await storage.createFile("medical_records", ID.unique(), file);
      // Link the file to the patient in the DB
      await axios.post("/api/records", {
        patient_id: user.$id,
        title: fileTitle,
        file_id: uploadedFile.$id,
        uploaded_by: "patient",
      });
      toast.success("File uploaded safely!");
      setFileTitle("");
      fetchRecords(user.$id); // refresh
    } catch (error: any) {
      toast.error("File upload failed", { description: error.message });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading your secure portal...</div>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Portal</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Appointments Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" /> My Appointments
          </h2>
          {appointments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No appointments booked yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <Card key={appt.$id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between">
                      {new Date(appt.date_time).toLocaleDateString("en-US", {
                        weekday: 'short', month: 'short', day: 'numeric',
                        hour: 'numeric', minute: '2-digit'
                      })}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {appt.status.toUpperCase()}
                      </span>
                    </CardTitle>
                    <CardDescription>{appt.reason}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Medical Records Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Medical Records
          </h2>
          <Card className="bg-muted/50 border-dashed border-2">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 text-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground" />
              <div>
                <p className="font-semibold">Upload New Record</p>
                <p className="text-sm text-muted-foreground">Share past prescriptions or lab results.</p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Input 
                  placeholder="E.g., Blood Test Report" 
                  value={fileTitle} 
                  onChange={(e) => setFileTitle(e.target.value)}
                />
                <div className="relative w-full">
                  <Input 
                    type="file" 
                    onChange={handleFileUpload} 
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 mt-6">
            {records.map((rec) => (
              <Card key={rec.$id} className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => window.open(getFileUrl("medical_records", rec.file_id), "_blank")}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{rec.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded by {rec.uploaded_by} • {new Date(rec.$createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
