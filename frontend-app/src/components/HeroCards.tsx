import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Facebook, Linkedin } from "lucide-react";
import { LightBulbIcon, GiftIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";

export const HeroCards = () => {
  const navigate = useNavigate();
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Sarah Cohen</CardTitle>
            <CardDescription>Donor</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          Supporting Lone Soldiers has been an incredible experience!
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?s=612x612&w=0&k=20&c=d8W_C2D-2rXlnkyl8EirpHGf-GpM62gBjpDoNryy98U="
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Maya Levin</CardTitle>
          <CardDescription className="font-normal text-primary">
            Donor Coordinator
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <p>
            Dedicated to connecting donors with Lone Soldiers and making a
            meaningful impact
          </p>
        </CardContent>

        <CardFooter>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/lonesoldier"
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Facebook</span>
              <Facebook size="20" />
            </a>
            <a
              href="https://www.linkedin.com/company/lonesoldier"
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Impact
            <Badge variant="secondary" className="text-sm text-primary">
              Make a Difference
            </Badge>
          </CardTitle>
          <CardDescription>
            Your support helps Lone Soldiers focus on their service
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full" onClick={() => navigate("/signup")}>
            Donate Now
          </Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["Direct Support", "Verified Recipients", "Real Impact"].map(
              (benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <GiftIcon />
          </div>
          <div>
            <CardTitle>Verified Support</CardTitle>
            <CardDescription className="text-md mt-2">
              Every donation request is verified and tracked to ensure your
              support reaches the Lone Soldiers who need it most.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
