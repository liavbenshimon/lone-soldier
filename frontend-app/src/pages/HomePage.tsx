import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";

export default function HomePage() {
  return (
    <div className="flex">
      {/* Navbar Vertical com Accordion na HomePage */}
      <Navbar isVertical={true} isAccordion={true} />

      {/* Feed */}
        <Feed />
    </div>
  );
}
