"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, LogOut, User, Menu, Home, LayoutDashboard, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9735976457";

  // Check auth state on mount and update whenever route changes
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    router.push("/");
  };

  const isDoctor = user?.labels?.includes("doctor");
  const portalName = isDoctor ? "Doctor Portal" : (user ? "Patient Portal" : "Portal");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger 
              render={<Button variant="ghost" size="icon" className="md:hidden" />}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col h-full bg-background border-r">
              <SheetHeader className="pb-6 border-b">
                <SheetTitle className="text-left font-bold text-2xl tracking-tight text-primary">Medicure</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-2 mt-6 flex-1">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-base font-medium">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  Home
                </Link>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-base font-medium">
                  <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                  {portalName}
                </Link>
                {!isDoctor && (
                  <Link href="/book-appointment" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-base font-medium">
                    <CalendarPlus className="h-5 w-5 text-muted-foreground" />
                    Book Now
                  </Link>
                )}
              </div>
              
              <div className="mt-auto pt-6 border-t pb-8 flex flex-col gap-4 px-2">
                {!isDoctor && (
                  <a href={`tel:${phoneNumber}`} className="w-full">
                    <Button className="w-full gap-2 justify-center" size="lg">
                      <Phone className="h-4 w-4" /> Call Now
                    </Button>
                  </a>
                )}
                
                {user ? (
                  <Button variant="outline" size="lg" onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="w-full gap-2 justify-center">
                    <LogOut className="h-4 w-4" /> Log Out
                  </Button>
                ) : (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" size="lg" className="w-full gap-2 justify-center">
                      <User className="h-4 w-4" /> Log In
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-primary">Medicure</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium mr-4">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <Link href="/dashboard" className="transition-colors hover:text-primary">{portalName}</Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {!isDoctor && (
              <a href={`tel:${phoneNumber}`} className="hidden sm:block">
                <Button variant="ghost" className="gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="hidden lg:inline">Call Now</span>
                </Button>
              </a>
            )}
            
            {user ? (
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log Out</span>
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="outline">Log In</Button>
              </Link>
            )}

            {!isDoctor && (
              <Link href="/book-appointment">
                <Button className="hidden sm:flex">Book Now</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
