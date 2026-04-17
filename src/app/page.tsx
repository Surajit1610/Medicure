import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Star, Award, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-primary mb-4 bg-background">
              <HeartPulse className="mr-2 h-4 w-4" /> Trusted Care, Right Here
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground max-w-4xl">
              Compassionate Medical Care for Your <span className="text-primary">Family</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Book your appointment today with Dr. Sharma. Modern treatments with a traditional touch of care and empathy.
            </p>
            <div className="flex gap-4 mt-8 flex-col sm:flex-row">
              <Link href="/book-appointment">
                <Button size="lg" className="px-8 h-12 w-full sm:w-auto text-lg gap-2 shadow-lg shadow-primary/20">
                  <CalendarDays className="w-5 h-5" /> Book Appointment
                </Button>
              </Link>
              <Link href="#credentials">
                <Button variant="outline" size="lg" className="px-8 h-12 w-full sm:w-auto text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Credentials */}
      <section id="credentials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">15+ Years Exp</h3>
              <p className="text-muted-foreground">Extensive experience in treating complex cases with high success.</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">MBBS, MD</h3>
              <p className="text-muted-foreground">Gold medalist. Specializing in Internal Medicine.</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <HeartPulse className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Holistic Care</h3>
              <p className="text-muted-foreground">Treating the root cause, not just the symptoms.</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Easy Scheduling</h3>
              <p className="text-muted-foreground">Book instantly online via our 24/7 web portal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">What Our Patients Say</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-background border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} fontVariant="solid" className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    {`"The doctor took the time to truly listen to my concerns. I've never felt so cared for in a clinical environment. Highly recommended!"`}
                  </p>
                  <p className="font-semibold text-sm">Patient {i}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
