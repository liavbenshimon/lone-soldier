import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, MessageSquare, Share } from "lucide-react";

export interface Post {
  _id: string;
  content: string;
  image?: string;
  author: {
    firstName: string;
    lastName: string;
    profileImage?: string;
    nickname?: string; // Inclui o nickname do autor
  };
  likes: string[]; // IDs dos usuários que curtiram
  comments: Array<{
    user: string; // ID do usuário que comentou
    text: string;
    createdAt: Date | string;
  }>;
  createdAt: Date | string; // Aceita string ou Date
}


export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="p-4 mb-6 max-w-4xl mx-auto shadow-md bg-gray-800 rounded-lg">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={post.author.profileImage || "/default-avatar.png"}
          alt={post.author.firstName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-bold text-base">
            {post.author.nickname}
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
          className="rounded-md mb-4 max-h-[400px] w-full object-cover"
        />
      )}
      <p className="text-gray-700 mb-4">{post.content}</p>

      {/* Footer */}
      <div className="flex justify-between text-gray-500 text-sm">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:text-blue-500"
        >
          <Check className="w-4 h-4" />
          <span>Like</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:text-blue-500"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:text-blue-500"
        >
          <Share className="w-4 h-4" />
          <span>Share</span>
        </Button>
      </div>
    </Card>
  );
}
