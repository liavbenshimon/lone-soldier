import { ReactPropTypes, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { useNavigate } from "react-router";
interface RouteProps {
  href: string;

  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#about",
    label: "About us",
  },
  {
    href: "#howItWorks",
    label: "How It Works",
  },
  {
    href: "#services",
    label: "Services",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];
interface NavbarProps {
  isVertical?: boolean; // Prop para HomePage
  isAccordion?: boolean; // Prop para funcionalidade de Accordion
  modes: string;
}

export const Navbar = ({
  isVertical = false,
  isAccordion = false,
  modes,
}: NavbarProps) => {
  // const isVertical = false;
  // const isAccordion = false;
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false); // Accordion
  const [mode, setmode] = useState(modes);
  if (mode == "landing") {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
            <NavigationMenuItem className="font-bold flex">
              <a
                rel="noreferrer noopener"
                href="/"
                className="ml-2 font-bold text-xl flex"
              >
                <LogoIcon />
                LoneSoldier
              </a>
            </NavigationMenuItem>

            {/* mobile */}
            <span className="flex md:hidden">
              <ModeToggle />

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2">
                  <Menu
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>

                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle className="font-bold text-xl">
                      LoneSoldier
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                    {routeList.map(({ href, label }: RouteProps) => (
                      <a
                        rel="noreferrer noopener"
                        key={label}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        {label}
                      </a>
                    ))}

                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                      Login
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                      SignUp
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </span>

            {/* desktop */}
            <nav className="hidden md:flex gap-2">
              {routeList.map((route: RouteProps, i) => (
                <a
                  rel="noreferrer noopener"
                  href={route.href}
                  key={i}
                  className={`text-[17px] ${buttonVariants({
                    variant: "ghost",
                  })}`}
                >
                  {route.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex gap-2">
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                SignUp
              </Button>

              <ModeToggle />
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    );
  } else if (mode == "home") {
    return (
      <>

        {/* Botão Accordion 
        {isAccordion && (
          <button
            className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md"
            onClick={() => setAccordionOpen(!accordionOpen)} // Alterna estado do Accordion */}

        {/* Accordion Button */}
        {isAccordion && (
          <button
            className="fixed top-4 left-4 z-50 bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-white p-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
            onClick={() => setAccordionOpen(!accordionOpen)}

          >
            {accordionOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        )}

        {/* Navbar Vertical em Desktop 
        {isVertical && (
          <aside
            className={`hidden md:flex flex-col h-screen bg-gray-300 p-4 fixed top-0 shadow-lg transition-all duration-300 ${*/}
        {/* Vertical Navbar */}
        {isVertical && (
          <aside
            className={`hidden md:flex flex-col h-screen bg-background border-r border-border p-4 fixed top-0 shadow-lg transition-all duration-300 ${

              accordionOpen ? "w-64 ml-18" : "w-18"
            }`}
          >
            <div
              className={`flex items-center mb-6 transition-all duration-300 ${
                accordionOpen ? "ml-10" : "ml-0"
              }`}
            >
              {accordionOpen && (

                <h1 className="ml-2 font-bold text-xl">
                  <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                    LoneSoldier
                  </span>

                </h1>
              )}
            </div>


            <nav
              className={`flex flex-col gap-4 ${
                accordionOpen ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            >
              {routeList.map((route) => (
                <a
                  key={route.label}
                  href={route.href}

                 /* className={`text-gray-700 hover:bg-gray-200 rounded p-2 ${*/

                  className={`text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md p-2 transition-colors ${

                    accordionOpen ? "block" : "hidden"
                  }`}
                >
                  {route.label}
                </a>
              ))}
            </nav>


            <div
              className={`mt-auto ${
                accordionOpen ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            >
              <ModeToggle />
            </div>
          </aside>
        )}


        {/* Navbar Horizontal (Mobile e Outras páginas) 
        <header
          className={'w-full bg-white shadow-md p-4 fixed top-0 z-40 flex justify-between items-center md:hidden'}
        >
          <div className="flex items-center">
            <LogoIcon />
            <h1 className="ml-2 font-bold text-xl text-blue-600">
              LoneSoldier*/}
        {/* Mobile Header */}
        <header className="w-full bg-background border-b border-border p-4 fixed top-0 z-40 flex justify-between items-center md:hidden">
          <div className="flex items-center">
            <LogoIcon />
            <h1 className="ml-2 font-bold text-xl">
              <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                LoneSoldier
              </span>

            </h1>
          </div>
          <ModeToggle />
        </header>
      </>
    );
  }

};

