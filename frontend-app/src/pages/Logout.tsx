import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  sessionStorage.clear();
  useEffect(() => {
    navigate("/");
  }, []);
  return <div></div>;
}
