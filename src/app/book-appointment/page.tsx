"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getCurrentUser } from "@/lib/auth";
import { databaseId, databases } from "@/lib/appwrite";
import { ID, Models } from "appwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Must be a valid email." }),
  phone: z.string().optional(),
  date: z.string().min(1, { message: "Please select a date." }),
  reason: z.string().min(5, { message: "Please provide a reason for the visit." }),
});

export default function BookAppointmentPage() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<Models.User<Models.Preferences> | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in to attach patient_id automatically
    getCurrentUser().then(user => setCurrentUser(user));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      reason: "",
    },
  });

  // Pre-fill if logged in
  useEffect(() => {
    if (currentUser) {
      form.setValue("name", currentUser.name);
      form.setValue("email", currentUser.email);
    }
  }, [currentUser, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await databases.createDocument(databaseId, "appointments", ID.unique(), {
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        patient_id: currentUser ? currentUser.$id : null,
        date_time: new Date(values.date).toISOString(),
        status: "pending",
        reason: values.reason,
      });

      toast.success("Appointment Booked Successfully!", {
        description: "We will contact you shortly to confirm the scheduled time.",
      });

      // Clear the form after submission
      form.reset();
      
      // Redirect home after a short delay
      setTimeout(() => router.push("/"), 2000);
      
    } catch (error: any) {
      toast.error("Booking Failed", {
        description: error.message || "An unexpected error occurred.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Book an Appointment</h1>
        <p className="text-muted-foreground">Fill in your details below. No account required.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                 <FormItem>
                  <FormLabel>Full Name</FormLabel>
                   <FormControl>
                    <Input placeholder="John Doe" {...field} />
                   </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                   <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                   </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                 <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                   <FormControl>
                    <Input placeholder="+91 98765 43210" {...field} />
                   </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                 <FormItem>
                  <FormLabel>Preferred Date & Time</FormLabel>
                   <FormControl>
                    <Input type="datetime-local" {...field} />
                   </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                 <FormItem className="sm:col-span-2">
                  <FormLabel>Reason for Visit</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder="Please describe your symptoms or reason for the appointment."
                      className="resize-none"
                      {...field}
                    />
                   </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
