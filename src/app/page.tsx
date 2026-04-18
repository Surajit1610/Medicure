"use client";

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/medical-hero-bg.svg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            className="flex flex-col items-center space-y-6 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/90 text-primary border-primary/20 backdrop-blur-sm">
                <HeartPulse className="mr-2 h-4 w-4" /> Trusted Medical Excellence
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white font-poppins leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Compassionate Care for Your <span className="text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Wellness</span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-white/90 md:text-xl lg:text-2xl leading-relaxed font-light drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Experience world-class medical care with Dr. Sharma. Combining cutting-edge technology with personalized attention to deliver exceptional healthcare outcomes.
            </motion.p>
            <motion.div
              className="flex gap-4 mt-8 flex-col sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={scaleOnHover} whileTap={{ scale: 0.95 }}>
                <Link href="/book-appointment">
                  <Button size="lg" className="px-8 h-14 w-full sm:w-auto text-lg font-semibold gap-3 shadow-xl shadow-black/25 hover:shadow-2xl transition-all duration-300 bg-white text-primary hover:bg-white/90">
                    <CalendarDays className="w-5 h-5" /> Book Appointment
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={scaleOnHover} whileTap={{ scale: 0.95 }}>
                <Link href="#about">
                  <Button variant="outline" size="lg" className="px-8 h-14 w-full sm:w-auto text-lg font-medium border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
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
                <motion.div className="flex items-start space-x-3" variants={staggerItem}>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">Patient-Centered Approach</h3>
                    <p className="text-muted-foreground">Every treatment plan is tailored to your unique needs and circumstances.</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-3" variants={staggerItem}>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">Latest Medical Technology</h3>
                    <p className="text-muted-foreground">Utilizing state-of-the-art diagnostic tools and treatment methods.</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-3" variants={staggerItem}>
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
                className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center space-y-4">
                  <motion.div
                    className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stethoscope className="h-16 w-16 text-primary" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-poppins">Dr. Sharma</h3>
                    <p className="text-muted-foreground">MBBS, MD (Internal Medicine)</p>
                    <p className="text-sm text-primary font-medium">15+ Years Experience</p>
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
              <motion.div key={index} variants={staggerItem}>
                <motion.div
                  whileHover={cardHover}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm h-full">
                    <CardHeader className="pb-4">
                      <motion.div
                        className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <service.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
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
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
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
              <motion.div key={index} variants={staggerItem}>
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
          </motion.div>
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
              <motion.div key={index} variants={staggerItem}>
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
        </div>
      </section>
    </div>
  );
}
