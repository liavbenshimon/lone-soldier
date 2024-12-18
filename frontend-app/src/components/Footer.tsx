import { buttonVariants } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
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
              <li>
                <a href="#">How to Donate</a>
              </li>
              <li>
                <a href="#">Browse Needs</a>
              </li>
              <li>
                <a href="#">Impact Stories</a>
              </li>
              <li>
                <a href="#">Donation Guidelines</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">For Soldiers</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#">Request Support</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
              <li>
                <a href="#">Emergency Help</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
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
