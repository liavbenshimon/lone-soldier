import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, MessageSquare, Share, Heart } from "lucide-react"; // Alteração: Heart para o ícone de like
import { api } from "@/api"; // Para atualizar os likes no backend

export interface Post {
  _id: string;
  content: string;
  image?: string;
  author: {
    firstName: string;
    lastName: string;
    profileImage?: string;
    nickname?: string;
  };
  likes: string[]; // IDs dos usuários que curtiram
  comments: Array<{
    user: string; // ID do usuário que comentou
    text: string;
    createdAt: Date | string;
  }>;
  createdAt: Date | string;
}

export function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes.length); 
  const [isLiked, setIsLiked] = useState(false); 

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    setIsLiked(post.likes.includes(userId || ""));
  }, [post.likes]);

  const handleLike = async () => {
    try {
      const userId = sessionStorage.getItem("id");
      if (!userId) {
        throw new Error("User not logged in");
      }
  
      setIsLiked(!isLiked);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  
      const response = await api.put(`/posts/${post._id}/like`, { userId });
  
      const { updatedLikes } = response.data;
      setLikes(updatedLikes.length);
      setIsLiked(updatedLikes.includes(userId));
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
  
      setIsLiked(isLiked);
      setLikes((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };
  

  return (
    <Card className="p-6 mb-6 max-w-4xl mx-auto shadow-lg bg-card text-card-foreground rounded-lg">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={post.author.profileImage || "/default-avatar.png"}
          alt={post.author.firstName}
          className="w-12 h-12 rounded-full border border-muted mr-4"
        />
        <div>
          <h3 className="font-bold text-base text-primary">
            {post.author.nickname || `${post.author.firstName} ${post.author.lastName}`}
          </h3>
          <p className="text-sm text-muted-foreground">
            {typeof post.createdAt === "string"
              ? new Date(post.createdAt).toLocaleDateString()
              : post.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      {post.image && (
        <img
          src={post.image}
          alt="Post media"
          className="rounded-md mb-4 w-full max-h-[400px] object-cover border border-muted"
        />
      )}
      <p className="text-foreground mb-4">{post.content}</p>

      {/* Footer */}
      <div className="flex justify-between items-center text-muted-foreground">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 ${isLiked ? "text-green-500" : "hover:text-primary"}`}
            onClick={handleLike}
          >
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:text-primary"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:text-primary"
        >
          <Share className="w-4 h-4" />
          <span>Share</span>
        </Button>
      </div>
    </Card>
  );
}
