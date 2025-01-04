import { useState } from "react";
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
import { useSelector } from "react-redux";
import { Button, buttonVariants } from "./ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { useNavigate } from "react-router";
import { RootState } from "@/Redux/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RouteProps {
  href: string;
  label: string;
}

interface AdminRouteSection {
  section?: string;
  routes?: RouteProps[];
  href?: string;
  label?: string;
}

const routeListHome: RouteProps[] = [
  {
    href: "/Home/donations",
    label: "Donations",
  },
  {
    href: "/Home/residences",
    label: "Residences",
  },
  {
    href: "/Home/eatup",
    label: "EatUps",
  },
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/Home/social",
    label: "Social",
  },
  {
    href: "/rights",
    label: "Your Rights",
  },
  {
    href: "/logout",
    label: "Logout",
  },
];
const routeListContribute: RouteProps[] = [
  {
    href: "/contribute",
    label: "contribute",
  },
  {
    href: "/new-post",
    label: "Donate",
  },
  {
    href: "/social",
    label: "Social",
  },
  {
    href: "/logout",
    label: "Logout",
  },
];

const routeListLanding: RouteProps[] = [
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

const routeListAdmin: AdminRouteSection[] = [
  {
    section: "Admin",
    routes: [
      {
        href: "/admin/queue",
        label: "Signup Queue",
      },
      {
        href: "/admin/users",
        label: "Manage Users",
      },
      {
        href: "/admin/posts",
        label: "Manage Posts",
      },
    ],
  },
  {
    section: "Soldier",
    routes: [
      {
        href: "/Home/donations",
        label: "Donations",
      },
      {
        href: "/Home/residences",
        label: "Residences",
      },
      {
        href: "/Home/eatup",
        label: "EatUps",
      },
      {
        href: "/Home/social",
        label: "Social",
      },
      {
        href: "/rights",
        label: "Your Rights",
      },
    ],
  },
  {
    section: "Contributor",
    routes: [
      {
        href: "/contribute",
        label: "Contribute",
      },
      {
        href: "/new-post",
        label: "Donate",
      },
    ],
  },
  // Public routes
  {
    href: "/logout",
    label: "Logout",
  },
];

interface NavbarProps {
  isVertical?: boolean; // Prop para HomePage
  isAccordion?: boolean; // Prop para funcionalidade de Accordion
  modes: string;
}

const renderAdminNav = (
  routeList: AdminRouteSection[],
  navigate: (path: string) => void
) => {
  return (
    <nav className="flex flex-col gap-4">
      <Accordion type="single" collapsible className="w-full">
        {routeList.map((item) => {
          if (item.section && item.routes) {
            return (
              <AccordionItem value={item.section} key={item.section}>
                <AccordionTrigger className="text-lg font-semibold">
                  {item.section}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 pl-4">
                    {item.routes.map((route) => (
                      <a
                        key={route.label}
                        onClick={() =>
                          route.href && navigate(route.href as string)
                        }
                        className="text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md p-2 transition-colors cursor-pointer"
                      >
                        {route.label}
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          } else if (item.href && item.label) {
            // Public routes
            return (
              <button
                key={item.label}
                onClick={() => item.href && navigate(item.href as string)}
                className="flex flex-1 items-center justify-between py-4 text-lg font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
              >
                {item.label}
              </button>
            );
          }
          return null;
        })}
      </Accordion>
    </nav>
  );
};

export const Navbar = ({
  isVertical = false,
  isAccordion = false,
  modes,
}: NavbarProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [mode] = useState(modes);

  const getRouteList = () => {
    if (user.type === "Admin") {
      return routeListAdmin;
    } else if (user.type === "Contributor") {
      return routeListContribute;
    } else {
      return routeListHome;
    }
  };

  const renderNavContent = (routeList: RouteProps[] | AdminRouteSection[]) => {
    if (user.type === "Admin") {
      return renderAdminNav(routeList as AdminRouteSection[], navigate);
    }

    return (
      <nav className="flex flex-col gap-4">
        {(routeList as RouteProps[]).map((route) => (
          <a
            key={route.label}
            onClick={() => navigate(route.href)}
            className="text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md p-2 transition-colors cursor-pointer"
          >
            {route.label}
          </a>
        ))}
      </nav>
    );
  };

  if (mode == "landing") {
    const routeList = routeListLanding;

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
                    <SheetTitle className="font-bold text-xl ">
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
                    {user.firstName ? (
                      <Button
                        className="w-full"
                        onClick={() => {
                          navigate("/home");
                        }}
                      >
                        {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}

                        {user.firstName}
                      </Button>
                    ) : (
                      <>
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
                      </>
                    )}
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
    const routeList = getRouteList();
    return (
      <>
        {/* Accordion Button for mobile and desktop */}
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

        {/* Vertical Navbar - Desktop and Mobile */}
        {isVertical && (
          <aside
            className={`flex flex-col h-screen bg-background border-r border-border p-4 fixed top-0 z-40 shadow-lg transition-all duration-300 ${
              accordionOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
            }`}
          >
            <div className="flex items-center mb-6">
              <h1 className="ml-2 font-bold text-xl">
                <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text ml-10">
                  LoneSoldier
                </span>
              </h1>
            </div>

            {renderNavContent(routeList)}

            <div className="mt-auto">
              <ModeToggle />
            </div>
          </aside>
        )}

        {/* Overlay when mobile menu is open */}
        {accordionOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setAccordionOpen(false)}
          />
        )}
      </>
    );
  } else if (mode == "home2") {
    const routeList = getRouteList();
    return (
      <>
        {/* Accordion Button for mobile and desktop */}
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

        {/* Vertical Navbar - Desktop and Mobile */}
        {isVertical && (
          <aside
            className={`flex flex-col h-screen bg-background border-r border-border p-4 fixed top-0 z-40 shadow-lg transition-all duration-300 ${
              accordionOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
            }`}
          >
            <div className="flex items-center mb-6">
              <h1 className="ml-2 font-bold text-xl">
                <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text ml-10">
                  LoneSoldier
                </span>
              </h1>
            </div>

            {renderNavContent(routeList)}

            <div className="mt-auto">
              <ModeToggle />
            </div>
          </aside>
        )}

        {/* Overlay when mobile menu is open */}
        {accordionOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setAccordionOpen(false)}
          />
        )}
      </>
    );
  }
};
