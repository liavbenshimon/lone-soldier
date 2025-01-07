import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";

export default function Social() {
  return (
    <div className="flex bg-background text-foreground min-h-screen">
      <Navbar modes="home" isVertical={true} isAccordion={true} />
      <div className="flex-1 mx-10">
        <Feed />
      </div>
    </div>
  );
}
