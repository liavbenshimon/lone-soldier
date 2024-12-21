import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll"; // Para scrolling automático
import israelLogo from "../assets/logos/israel.png";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false); // Estado que controla a Sidebar

  // Função para fechar a Sidebar
  const closeSidebar = () => setOpen(false);

  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 shadow-md">
      {/* Logo */}
      <img src={israelLogo} alt="Logo" className="h-10" />

      {/* Sidebar Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Button to open Sidebar */}
        <SheetTrigger asChild>
          <Button variant="outline" className="text-white">
            ☰
          </Button>
        </SheetTrigger>

        {/* Sidebar Content */}
        <SheetContent side="right" className="w-[250px]">
          <nav className="flex flex-col gap-4 mt-6">
            {/* Sidebar Links */}
            <Link to="sign-up" smooth={true} duration={500} onClick={closeSidebar} className="cursor-pointer">
              Sign Up
            </Link>
            <Link to="log-in" smooth={true} duration={500} onClick={closeSidebar} className="cursor-pointer">
              Log In
            </Link>
            <Link to="about-us" smooth={true} duration={500} onClick={closeSidebar} className="cursor-pointer">
              About Us
            </Link>
            <Link to="partners" smooth={true} duration={500} onClick={closeSidebar} className="cursor-pointer">
              Partners
            </Link>
            <Link to="common-questions" smooth={true} duration={500} onClick={closeSidebar} className="cursor-pointer">
              Common Questions
            </Link>
            <Link to="contact-us" smooth={true} duration={500} onClick={closeSidebar} className="cursor-pointer">
              Contact
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
