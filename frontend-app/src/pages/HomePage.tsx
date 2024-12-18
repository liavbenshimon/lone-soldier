import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";

export default function HomePage() {
  return (
    <div className="flex">
      {/* Navbar Vertical com Accordion na HomePage */}
      {/* isVertical={true} isAccordion={true} */}
      <Navbar modes="home" isVertical={true} isAccordion={true} />

      {/* Feed */}
      <Feed />
    </div>
  );
}
