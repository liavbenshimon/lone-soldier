import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Social() {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post"); // Redireciona para a página de criação de posts
  };

  return (
    <div className="flex bg-background text-foreground min-h-screen relative">
      {/* Navbar */}
      <Navbar modes="home" isVertical={true} isAccordion={true} />

      {/* Feed */}
      <div className="flex-1 mx-10">
        <Feed mode="post" />
      </div>

      {/* Botão para criar post */}
      <Button
        onClick={handleCreatePost}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center"
        aria-label="Create Post"
      >
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
}
