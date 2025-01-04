import { RouteProps, AdminRouteSection } from "./types";

export const routeListHome: RouteProps[] = [
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
  {
    href: "/logout",
    label: "Logout",
  },
];

export const routeListContribute: RouteProps[] = [
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

export const routeListLanding: RouteProps[] = [
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

export const routeListAdmin: AdminRouteSection[] = [
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
        label: "contribute",
      },
      {
        href: "/new-post",
        label: "Donate",
      },
    ],
  },
  {
    href: "/logout",
    label: "Logout",
  },
];
