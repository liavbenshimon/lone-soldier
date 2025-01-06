import { RouteProps, AdminRouteSection } from "./types";

// Common routes available to all authenticated users
const commonRoutes: RouteProps[] = [
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/logout",
    label: "Logout",
  },
];

// Soldier-specific routes
export const routeListSoldier: RouteProps[] = [
  {
    href: "/requestForm",
    label: "Request Form",
  },
  {
    href: "/Home/social",
    label: "Soldier Social",
  },
  {
    href: "/Home/eatup",
    label: "EatUps",
  },
  {
    href: "/vouchers",
    label: "Vouchers",
  },
  ...commonRoutes,
];

// Municipality-specific routes
export const routeListMunicipality: RouteProps[] = [
  {
    href: "/answer-request-form",
    label: "Answer Request Form",
  },
  {
    href: "/Home/social",
    label: "Municipality Social",
  },
  {
    href: "/create-events",
    label: "Create Events",
  },
  {
    href: "/connect-donors",
    label: "Connect Donors to Soldier",
  },
  ...commonRoutes,
];

// Donor-specific routes
export const routeListDonor: RouteProps[] = [
  {
    href: "/pay-request-form",
    label: "Pay for Request Form",
  },
  {
    href: "/create-eatups",
    label: "Create EatUps",
  },
  {
    href: "/offer-donation",
    label: "Offer Donation",
  },
  {
    href: "/Home/social",
    label: "Donor Social",
  },
  ...commonRoutes,
];

// Organization-specific routes
export const routeListOrganization: RouteProps[] = [
  {
    href: "/Home/social",
    label: "Organization Social",
  },
  {
    href: "/create-events",
    label: "Create Events",
  },
  ...commonRoutes,
];

// Business-specific routes
export const routeListBusiness: RouteProps[] = [
  {
    href: "/add-discount",
    label: "Add Discount",
  },
  {
    href: "/verify-soldier",
    label: "Verify Lone Soldier by QR",
  },
  {
    href: "/create-vouchers",
    label: "Create Vouchers",
  },
  ...commonRoutes,
];

// Landing page routes (public)
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

// Admin routes with sections for each role
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
    routes: routeListSoldier,
  },
  {
    section: "Municipality",
    routes: routeListMunicipality,
  },
  {
    section: "Donor",
    routes: routeListDonor,
  },
  {
    section: "Organization",
    routes: routeListOrganization,
  },
  {
    section: "Business",
    routes: routeListBusiness,
  },
  {
    href: "/logout",
    label: "Logout",
  },
];
