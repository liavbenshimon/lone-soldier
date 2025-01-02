import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

export const WelcomeDialog: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const showDialog = sessionStorage.getItem("showWelcomeDialog");
    if (showDialog === "false") {
      setIsVisible(true);
      sessionStorage.removeItem("showWelcomeDialog");
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h2>
        <p>
          Your nickname is <span className="font-semibold text-pink-500">{user.nickname}</span>.
        </p>
        <p>
          You can change your nickname and profile picture anytime in your profile page.
        </p>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setIsVisible(false)}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
