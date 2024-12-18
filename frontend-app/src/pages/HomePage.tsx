import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";

export default function HomePage() {
  return (
    <div className="flex bg-background text-foreground min-h-screen">
      {/* Navbar Vertical com Accordion na HomePage */}
      {/* isVertical={true} isAccordion={true} */}
      <Navbar modes="home" isVertical={true} isAccordion={true} />

      {/* Feed */}
      <div className="flex-1">
        <Feed />
      </div>
    </div>
  );
}
