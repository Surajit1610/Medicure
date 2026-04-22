"use client";

import Link from "next/link";
import Image from "next/image";
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
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const scaleOnHover = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

const cardHover = {
  scale: 1.02,
  y: -5,
  transition: { duration: 0.3 }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-0 pb-0 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40 bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-8 items-center gap-8 md:gap-12">
            {/* Left Column: Text */}
            <motion.div
              className="flex flex-col space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                  <HeartPulse className="mr-2 h-4 w-4" /> Trusted Medical Excellence
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground font-poppins leading-[1.1]">
                  Compassionate Care for Your <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Wellness</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Experience world-class medical care with Dr. Sharma. Combining cutting-edge technology with personalized attention to deliver exceptional healthcare outcomes.
                </p>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row">
                <motion.div whileHover={scaleOnHover} whileTap={{ scale: 0.95 }}>
                  <Link href="/book-appointment">
                    <Button size="lg" className="px-8 h-14 w-full sm:w-auto text-lg font-semibold gap-3 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CalendarDays className="w-5 h-5" /> Book Appointment
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={scaleOnHover} whileTap={{ scale: 0.95 }}>
                  <Link href="#about">
                    <Button variant="outline" size="lg" className="px-8 h-14 w-full sm:w-auto text-lg font-medium border-2 transition-all duration-300">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Hero Image */}
            <motion.div
              className="relative block mx-auto w-full max-w-[600px] lg:max-w-none mt-12 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border bg-muted/20">
                <Image
                  src="/hero-medical.png"
                  alt="Friendly doctor consulting patient"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-background rounded-2xl p-3 md:p-6 shadow-xl border z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Star className="h-4 w-4 md:h-6 md:w-6 text-green-600 fill-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg md:text-xl">4.9/5</p>
                    <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Patient Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Doctor Section */}
      <section id="about" className="w-full py-20 md:py-28 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="grid gap-12 lg:grid-cols-2 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="space-y-6">
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={staggerItem}>
                  <Badge variant="outline" className="text-primary border-primary/30">About Dr. Sharma</Badge>
                </motion.div>
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins"
                  variants={staggerItem}
                >
                  Dedicated to Your Health Journey
                </motion.h2>
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
                  variants={staggerItem}
                >
                  With over 15 years of experience in internal medicine, Dr. Sharma has been at the forefront of medical innovation while maintaining the personal touch that patients value most.
                </motion.p>
              </motion.div>
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div className="flex items-start space-x-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">Patient-Centered Approach</h3>
                    <p className="text-muted-foreground">Every treatment plan is tailored to your unique needs and circumstances.</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">Latest Medical Technology</h3>
                    <p className="text-muted-foreground">Utilizing state-of-the-art diagnostic tools and treatment methods.</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">Holistic Wellness Focus</h3>
                    <p className="text-muted-foreground">Addressing physical, mental, and emotional health for complete care.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="relative aspect-square md:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/doctor-portrait.png"
                  alt="Portrait of Dr. Sharma"
                  fill
                  className="object-cover"
                />
                {/* Overlay text at bottom of portrait */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-16">
                  <div className="text-white space-y-1">
                    <h3 className="text-2xl font-bold font-poppins text-white drop-shadow-md">Dr. Sharma</h3>
                    <p className="text-white/90 font-medium">MBBS, MD (Internal Medicine)</p>
                    <p className="text-primary-foreground/80 text-sm">15+ Years Clinical Experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <motion.div variants={staggerItem}>
              <Badge variant="outline" className="text-primary border-primary/30">Our Services</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins"
              variants={staggerItem}
            >
              Comprehensive Medical Care
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-muted-foreground text-lg"
              variants={staggerItem}
            >
              From routine check-ups to specialized treatments, we provide a full spectrum of healthcare services.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: HeartPulse,
                title: "Cardiology Consultations",
                description: "Expert heart health assessments and preventive care strategies.",
                image: "/cardiology.png"
              },
              {
                icon: Stethoscope,
                title: "Internal Medicine",
                description: "Comprehensive diagnosis and treatment of complex medical conditions.",
                image: "/internal-med.png"
              },
              {
                icon: Microscope,
                title: "Diagnostic Services",
                description: "Advanced laboratory testing and imaging for accurate diagnosis.",
                image: "/diagnostic.png"
              },
              {
                icon: Users,
                title: "Family Medicine",
                description: "Caring for patients of all ages with a focus on family health.",
                image: "/family-med.png"
              },
              {
                icon: Shield,
                title: "Preventive Care",
                description: "Proactive health screenings and wellness programs.",
                image: "/preventive.png"
              },
              {
                icon: Clock,
                title: "Emergency Care",
                description: "24/7 availability for urgent medical situations.",
                image: "/hero-medical.png"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <motion.div
                  whileHover={cardHover}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border border-border/5 bg-card overflow-hidden h-full flex flex-col">
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pt-8 pb-4 relative">
                      <motion.div
                        className="absolute -top-8 left-6 w-14 h-14 bg-background shadow-md border border-border/10 rounded-2xl flex items-center justify-center"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <service.icon className="h-7 w-7 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl font-semibold font-poppins">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <motion.div variants={staggerItem}>
              <Badge variant="outline" className="text-primary border-primary/30">Why Choose Us</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins"
              variants={staggerItem}
            >
              Excellence in Healthcare
            </motion.h2>
          </motion.div>
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
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              >
                <motion.div
                  className="text-center space-y-4 p-6 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors h-full"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <credential.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold font-poppins">{credential.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{credential.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <motion.div variants={staggerItem}>
              <Badge variant="outline" className="text-primary border-primary/30">Patient Stories</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins"
              variants={staggerItem}
            >
              What Our Patients Say
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-muted-foreground text-lg"
              variants={staggerItem}
            >
              Real experiences from patients who trust us with their healthcare needs.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
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
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="bg-background border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <CardContent className="p-8">
                      <motion.div
                        className="flex items-center space-x-1 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: (index * 0.1) + (j * 0.05) }}
                          >
                            <Star className="w-5 h-5 fill-primary text-primary" />
                          </motion.div>
                        ))}
                      </motion.div>
                      <blockquote className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Users className="h-5 w-5 text-primary" />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">Patient</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-poppins"
              variants={staggerItem}
            >
              Ready to Prioritize Your Health?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl opacity-90 leading-relaxed"
              variants={staggerItem}
            >
              Take the first step towards better health. Book your appointment today and experience the difference professional medical care can make.
            </motion.p>
            <motion.div
              className="flex gap-6 justify-center flex-col sm:flex-row"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} whileHover={scaleOnHover} whileTap={{ scale: 0.95 }}>
                <Link href="/book-appointment">
                  <Button size="lg" variant="secondary" className="px-8 h-14 text-lg font-semibold gap-3 shadow-lg">
                    <CalendarDays className="w-5 h-5" /> Book Appointment
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                className="flex gap-4 justify-center"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.a
                  href="tel:+919735976457"
                  className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity"
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/919735976457"
                  className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity"
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="h-5 w-5" />
                  <span>WhatsApp</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-20 mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:block relative border-4 border-white/20 bg-slate-900"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Image Layer */}
            <div className="relative w-full aspect-[4/3] sm:aspect-video md:absolute md:inset-0">
              <Image
                src="/telemedicine.png"
                alt="Telemedicine Lifestyle"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Desktop Spacing Placeholder */}
            <div className="hidden md:block w-full aspect-[21/9]"></div>

            {/* Content Layer (Stacked on mobile, Absolute on desktop) */}
            <div className="relative z-10 p-8 sm:p-10 md:p-12 md:absolute md:inset-0 flex items-center bg-gradient-to-t overflow-hidden md:bg-gradient-to-r from-black/95 via-black/80 md:via-black/50 to-black/40 md:to-transparent">
              <div className="max-w-md relative z-20">
                <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground border-transparent">Virtual Clinic</Badge>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">Care from Anywhere</h3>
                <p className="text-white/90 text-lg sm:text-xl mb-8 drop-shadow">Connect with Dr. Sharma instantly through high-quality video consultations from the comfort of your home.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
