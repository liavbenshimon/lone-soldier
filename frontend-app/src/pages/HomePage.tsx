import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";

export default function HomePage({ mode }: { mode: string }) {
  return (
    <div className="flex bg-background text-foreground min-h-screen">
      {/* Navbar Vertical com Accordion na HomePage */}

      {/* isVertical={true} isAccordion={true} */}
      <Navbar modes="home" isVertical={true} isAccordion={true} />


      {/* Feed */}
      <div className="flex-1 mx-10">
        <Feed mode={mode} />
      </div>
    </div>
  );
}
