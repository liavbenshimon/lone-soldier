import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { useNavigate } from "react-router";
interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [

/*   { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

interface NavbarProps {
  isVertical?: boolean; // Prop para HomePage
  isAccordion?: boolean; // Prop para funcionalidade de Accordion
} */

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

export const Navbar = () => {
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


      {/* Navbar Vertical em Desktop 
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
          </div>*/}

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


          {/* Alternar Tema 
          <div
            className={`mt-auto ${accordionOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          >*/}

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
        </aside>
      )}

      {/* Navbar Horizontal (Mobile e Outras páginas) */}
      <header
        className={`w-full bg-white shadow-md p-4 fixed top-0 z-40 flex justify-between items-center md:hidden`}
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
