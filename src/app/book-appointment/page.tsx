"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerUser, loginUser } from "@/lib/auth";
import { databaseId, databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  phone: z.string().optional(),
  date: z.string().min(1, { message: "Please select a date." }),
  reason: z.string().min(5, { message: "Please provide a reason for the visit." }),
});

export default function BookAppointmentPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      date: "",
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // 1. Create User & Session
      let user;
      try {
        user = await registerUser(values.email, values.password, values.name, values.phone);
      } catch (e: any) {
        // If user already exists, try logging in
        if (e.code === 409) {
          await loginUser(values.email, values.password);
          // TODO: fetch user id from session/account to map
          // For simplicity in this flow, we notify the user.
          toast.error("Account exists. Please login instead, or use a different email.", {
            description: "Currently, this demo requires a new email for seamless booking.",
          });
          setLoading(false);
          return;
        } else {
          throw e;
        }
      }

      // 2. Create Appointment Document
      if (user) {
        await databases.createDocument(databaseId, "appointments", ID.unique(), {
          patient_id: user.$id,
          date_time: new Date(values.date).toISOString(),
          status: "pending",
          reason: values.reason,
        });

        toast.success("Appointment Booked Successfully!", {
          description: "Your session has been started. Redirecting to dashboard...",
        });

        // 3. Redirect to dashboard
        setTimeout(() => router.push("/dashboard"), 1500);
      }
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
        <p className="text-muted-foreground">Fill in your details to schedule a visit with Dr. Sharma.</p>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>To access your patient portal later.</FormDescription>
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
                <FormItem className="sm:col-span-2">
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
