import { RouteProps, AdminRouteSection } from "./types";

export const routeListHome: RouteProps[] = [
  {
    href: "/",
    label: "Home",
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
    href: "/requestForm",
    label: "Request Form",
  }, 
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/logout",
    label: "Logout",
  }
];
// {
//   href: "/Home/donations",
//   label: "Donations",
// },
// {
//   href: "/Home/residences",
//   label: "Residences",
// },

export const routeListContribute: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
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
    href: "/my-eatups",
    label: "My EatUps",
  },
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/logout",
    label: "Logout",
  }
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
        href: "/",
        label: "Home",
      }, 
      // {
      //   href: "/Home/donations",
      //   label: "Donations",
      // },
      // {
      //   href: "/Home/residences",
      //   label: "Residences",
      // },
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
