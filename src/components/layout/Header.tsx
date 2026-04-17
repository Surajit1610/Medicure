"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9735976457";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight text-primary">Medicure</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <Link href="/book-appointment" className="transition-colors hover:text-primary">Book Appointment</Link>
            <Link href="/dashboard" className="transition-colors hover:text-primary">Patient Portal</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={`tel:${phoneNumber}`} className="hidden sm:block">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">Call Now</span>
              </Button>
            </a>
            <Link href="/book-appointment">
              <Button className="hidden sm:flex">Book Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
