import { Card } from "./ui/card";

interface Post {
  _id: string;
  content: string;
  image?: string;
  author: {
    firstName: string;
    lastName: string;
    profileImage?: string;
    type: string;
  };
  likes: string[];
  comments: Array<{
    user: string;
    text: string;
    createdAt: string;
  }>;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="p-4 md:p-6 mb-6 max-w-4xl mx-auto shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={post.author.profileImage || "/default-avatar.png"}
          alt={post.author.firstName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-bold text-lg">
            {post.author.firstName} {post.author.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">{post.author.type}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-muted-foreground">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="rounded-md mt-2 max-h-[250px] object-contain"
          />
        )}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <p>{post.likes.length} Likes</p>
        <p>{post.comments.length} Comments</p>
      </div>
    </Card>
  );
}