import { useState } from "react";
import { Navbar } from "@/components/Navbar"; // Reutilizando o Navbar com modo "home"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Social() {
  const [showNotice, setShowNotice] = useState(true); // Controla o aviso inicial

  // Dummy Data para simular perfis e mensagens
  const conversations = [
    {
      name: "Daniel Katz",
      message: "Does anyone have tips to improve running time?",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Noa Levi",
      message: "How do you deal with missing home?",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Cohen",
      message: "Any recommended core strengthening exercises?",
      avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    },
  ];

  return (
    <div className="flex bg-background text-foreground min-h-screen">
      <Navbar isVertical={true} isAccordion={true} modes="home" />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
          {showNotice ? (
            <div
              className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setShowNotice(false)}
            >
              <Card className="max-w-md mx-auto text-center">
                <CardHeader>
                  <CardTitle className="text-4xl">
                    Coming Soon: Social
                  </CardTitle>
                  <CardDescription>
                    <span
                      role="img"
                      aria-label="happy emoji"
                      className="text-6xl"
                    >
                      😃
                    </span>
                    <p className="mt-4">
                      Find other lone soldiers here, ask questions, and make
                      friends. You are no longer alone!
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setShowNotice(false)}>Enter</Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <section className="space-y-8">
              <h1 className="text-3xl font-bold text-center">
                <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                  Social
                </span>{" "}
                - Lone Soldiers Community
              </h1>
              <div className="space-y-4">
                {conversations.map((chat, index) => (
                  <Card key={index} className="p-4">
                    <CardHeader className="flex items-center gap-4">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle>{chat.name}</CardTitle>
                        <CardDescription>{chat.message}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
