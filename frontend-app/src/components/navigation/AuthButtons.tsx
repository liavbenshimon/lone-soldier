import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  user: any;
  navigate: (path: string) => void;
}

export const AuthButtons = ({ user, navigate }: AuthButtonsProps) => {
  if (user.type === "Soldier") {
    return (
      <Button className="w-full" onClick={() => navigate("/home/eatup")}>
        {user.firstName}
      </Button>
    );
  }

  return (
    <>
      <Button className="w-full" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button className="w-full" onClick={() => navigate("/signup")}>
        SignUp
      </Button>
    </>
  );
};
