import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Redux/store";
// import { setActiveChannel } from "@/Redux/channelSlice";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

export default function ChannelPage() {
  const { channelId } = useParams<{ channelId: string }>();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeChannel = useSelector((state: RootState) =>
    state.channels.channels.find((c) => c._id === channelId)
  );

  useEffect(() => {
    if (channelId) {
      // dispatch(setActiveChannel(channelId));
      // fetchMessages();
    }
  }, [channelId]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages/${channelId}`);
      setMessages(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to fetch messages");
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await api.post(`/messages/${channelId}`, {
        content: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to send message");
    }
  };

  if (!activeChannel) {
    return <div>Channel not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="h-[calc(100vh-8rem)]">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">{activeChannel.name}</h1>
        </div>

        <div className="flex flex-col h-[calc(100%-8rem)]">
          <ScrollArea className="flex-1 p-4">
            {loading ? (
              <div>Loading messages...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className="bg-muted/50 rounded-lg p-3 space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        {message.sender.firstName} {message.sender.lastName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
