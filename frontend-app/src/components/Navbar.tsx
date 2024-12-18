import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

interface NavbarProps {
  isVertical?: boolean; // Prop para HomePage
  isAccordion?: boolean; // Prop para funcionalidade de Accordion
}

export const Navbar = ({ isVertical = false, isAccordion = false }: NavbarProps) => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false); // Accordion toggle

  return (
    <>
      {/* Botão Accordion */}
      {isAccordion && (
        <button
          className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md"
          onClick={() => setAccordionOpen(!accordionOpen)} // Alterna estado do Accordion
        >
          {accordionOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Navbar Vertical em Desktop */}
      {isVertical && (
        <aside
          className={`hidden md:flex flex-col h-screen bg-gray-300 p-4 fixed top-0 shadow-lg transition-all duration-300 ${
            accordionOpen ? "w-64 ml-18" : "w-18"
          }`}
        >
          <div
            className={`flex items-center mb-6 transition-all duration-300 ${
              accordionOpen ? "ml-10" : "ml-0"
            }`}
          >
            {accordionOpen && (
              <h1 className="ml-2 font-bold text-xl text-blue-600">LoneSoldier</h1>
            )}
          </div>

          {/* Links de navegação */}
          <nav
            className={`flex flex-col gap-4 ${
              accordionOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            {routeList.map((route) => (
              <a
                key={route.label}
                href={route.href}
                className={`text-gray-700 hover:bg-gray-200 rounded p-2 ${
                  accordionOpen ? "block" : "hidden"
                }`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          {/* Alternar Tema */}
          <div className={`mt-auto ${accordionOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
  <ModeToggle />
</div>

        </aside>
      )}

      {/* Navbar Horizontal (Mobile e Outras páginas) */}
      <header
  className="w-full bg-white shadow-md p-4 fixed top-0 z-40 flex justify-between items-center md:hidden"
>

        <div className="flex items-center">
          <LogoIcon />
          <h1 className="ml-2 font-bold text-xl text-blue-600">LoneSoldier</h1>
        </div>
        <ModeToggle />
      </header>
    </>
  );
};