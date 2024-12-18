
import { buttonVariants } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  const donorLinks = [
    { text: "How to Donate", path: "/how-to-donate" },
    { text: "Browse Needs", path: "/browse-needs" },
    { text: "Impact Stories", path: "/impact-stories" },
    { text: "Donation Guidelines", path: "/guidelines" },
  ];

  const soldierLinks = [
    { text: "Request Support", path: "/request-support" },
    { text: "Resources", path: "/resources" },
    { text: "Community", path: "/community" },
    { text: "Emergency Help", path: "/emergency" },
  ];

  const legalLinks = [
    { text: "Privacy Policy", path: "/privacy" },
    { text: "Terms of Service", path: "/terms" },
    { text: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="border-t">
      <div className="container py-12 md:py-24 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <h3 className="text-xl font-bold mb-4">LoneSoldier Support</h3>
          <p className="text-muted-foreground mb-4">
            Connecting communities worldwide with IDF Lone Soldiers through
            meaningful donations and support.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:w-2/3">
          <div>
            <h3 className="font-bold mb-4">For Donors</h3>
            <ul className="space-y-3 text-muted-foreground">
              {donorLinks.map((link) => (
                <li key={link.path}>
                  <a
                    onClick={() => navigate(link.path)}
                    style={{ cursor: "pointer" }}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">For Soldiers</h3>
            <ul className="space-y-3 text-muted-foreground">
              {soldierLinks.map((link) => (
                <li key={link.path}>
                  <a
                    onClick={() => navigate(link.path)}
                    style={{ cursor: "pointer" }}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-3 text-muted-foreground">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <a
                    onClick={() => navigate(link.path)}
                    style={{ cursor: "pointer" }}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-6 text-center text-muted-foreground">
          © {new Date().getFullYear()} LoneSoldier Support. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
