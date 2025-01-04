import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

export default function HomePage({ mode }: { mode: string }) {
  const user = useSelector((state: RootState) => state.user);
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
