"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const pathname = usePathname();
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9735976457";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%20Dr.,%20I%20would%20like%20to%20book%20an%20appointment.`;

  if (pathname !== "/") {
    return null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
