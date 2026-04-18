import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Star,
  Award,
  HeartPulse,
  Stethoscope,
  Microscope,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Phone,
  MapPin,
  Mail
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/medical-hero-bg.svg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center space-y-6 text-center max-w-5xl mx-auto">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/90 text-primary border-primary/20 backdrop-blur-sm">
              <HeartPulse className="mr-2 h-4 w-4" /> Trusted Medical Excellence
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white font-poppins leading-tight drop-shadow-lg">
              Compassionate Care for Your <span className="text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Wellness</span>
            </h1>
            <p className="mx-auto max-w-2xl text-white/90 md:text-xl lg:text-2xl leading-relaxed font-light drop-shadow-md">
              Experience world-class medical care with Dr. Sharma. Combining cutting-edge technology with personalized attention to deliver exceptional healthcare outcomes.
            </p>
            <div className="flex gap-4 mt-8 flex-col sm:flex-row">
              <Link href="/book-appointment">
                <Button size="lg" className="px-8 h-14 w-full sm:w-auto text-lg font-semibold gap-3 shadow-xl shadow-black/25 hover:shadow-2xl transition-all duration-300 bg-white text-primary hover:bg-white/90">
                  <CalendarDays className="w-5 h-5" /> Book Appointment
                </Button>
              </Link>
              <Link href="#about">
                <Button variant="outline" size="lg" className="px-8 h-14 w-full sm:w-auto text-lg font-medium border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Doctor Section */}
      <section id="about" className="w-full py-20 md:py-28 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/30">About Dr. Sharma</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins">
                  Dedicated to Your Health Journey
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With over 15 years of experience in internal medicine, Dr. Sharma has been at the forefront of medical innovation while maintaining the personal touch that patients value most.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Patient-Centered Approach</h3>
                    <p className="text-muted-foreground">Every treatment plan is tailored to your unique needs and circumstances.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Latest Medical Technology</h3>
                    <p className="text-muted-foreground">Utilizing state-of-the-art diagnostic tools and treatment methods.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Holistic Wellness Focus</h3>
                    <p className="text-muted-foreground">Addressing physical, mental, and emotional health for complete care.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Stethoscope className="h-16 w-16 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-poppins">Dr. Sharma</h3>
                    <p className="text-muted-foreground">MBBS, MD (Internal Medicine)</p>
                    <p className="text-sm text-primary font-medium">15+ Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary/30">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins">
              Comprehensive Medical Care
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              From routine check-ups to specialized treatments, we provide a full spectrum of healthcare services.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: HeartPulse,
                title: "Cardiology Consultations",
                description: "Expert heart health assessments and preventive care strategies."
              },
              {
                icon: Stethoscope,
                title: "Internal Medicine",
                description: "Comprehensive diagnosis and treatment of complex medical conditions."
              },
              {
                icon: Microscope,
                title: "Diagnostic Services",
                description: "Advanced laboratory testing and imaging for accurate diagnosis."
              },
              {
                icon: Users,
                title: "Family Medicine",
                description: "Caring for patients of all ages with a focus on family health."
              },
              {
                icon: Shield,
                title: "Preventive Care",
                description: "Proactive health screenings and wellness programs."
              },
              {
                icon: Clock,
                title: "Emergency Care",
                description: "24/7 availability for urgent medical situations."
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary/30">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins">
              Excellence in Healthcare
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                title: "15+ Years Experience",
                description: "Extensive expertise in treating complex medical cases with proven success rates."
              },
              {
                icon: Star,
                title: "Board Certified",
                description: "MBBS, MD with gold medal distinction in Internal Medicine."
              },
              {
                icon: HeartPulse,
                title: "Holistic Approach",
                description: "Treating the root cause, not just symptoms, for lasting health outcomes."
              },
              {
                icon: CalendarDays,
                title: "Convenient Scheduling",
                description: "Easy online booking with flexible appointment times and minimal wait times."
              }
            ].map((credential, index) => (
              <div key={index} className="text-center space-y-4 p-6 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <credential.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-poppins">{credential.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{credential.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary/30">Patient Stories</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins">
              What Our Patients Say
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Real experiences from patients who trust us with their healthcare needs.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Mrs. Priya Sharma",
                rating: 5,
                text: "Dr. Sharma's compassionate approach and thorough examinations gave me complete confidence in my treatment. The care I received was exceptional."
              },
              {
                name: "Mr. Rajesh Kumar",
                rating: 5,
                text: "Outstanding medical care with a personal touch. Dr. Sharma took the time to explain everything clearly and made me feel truly cared for."
              },
              {
                name: "Ms. Anita Singh",
                rating: 5,
                text: "The doctor's expertise and the clinic's modern facilities made my experience wonderful. Highly recommend for anyone seeking quality healthcare."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-background border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">Patient</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins">
              Ready to Prioritize Your Health?
            </h2>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Take the first step towards better health. Book your appointment today and experience the difference professional medical care can make.
            </p>
            <div className="flex gap-6 justify-center flex-col sm:flex-row">
              <Link href="/book-appointment">
                <Button size="lg" variant="secondary" className="px-8 h-14 text-lg font-semibold gap-3 shadow-lg">
                  <CalendarDays className="w-5 h-5" /> Book Appointment
                </Button>
              </Link>
              <div className="flex gap-4 justify-center">
                <a href="tel:+919735976457" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
                <a href="https://wa.me/919735976457" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
                  <MapPin className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
