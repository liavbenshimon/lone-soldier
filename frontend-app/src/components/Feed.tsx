import { PostCard } from "./PostCard";

export function Feed() {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
