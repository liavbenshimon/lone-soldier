import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "@/Redux/store";
import { NavbarProps } from "./navigation/types";
import { setChannels } from "@/Redux/channelSlice";
import {
  routeListHome,
  routeListContribute,
  routeListLanding,
  routeListAdmin,
} from "./navigation/routes";
import { LandingNav } from "./navigation/variants/LandingNav";
import { HomeNav } from "./navigation/variants/HomeNav";
import { AdminNav } from "./navigation/variants/AdminNav";
import { RouteProps } from "./navigation/types";
import { api } from "@/api";

export const Navbar = ({
  isVertical = false,
  isAccordion = false,
  modes,
}: NavbarProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const channels = useSelector((state: RootState) => state.channels.channels);
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [channelsLinks, setChannelsLinks] = useState<RouteProps[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChannels = async () => {
      const response = await api.get("/channels");
      dispatch(setChannels(response.data));
    };
    //TODO: remove this change to _id
    if (user.email) {
      fetchChannels();
    }
  }, []);

  useEffect(() => {
    console.log("channels", channels);

    if (channels) {
      setChannelsLinks(
        channels.map((channel) => ({
          href: `/channel/${channel._id}`,
          label: channel.name,
        }))
      );
    }
  }, [channels]);

  const getRouteList = () => {
    const userType = user.type?.toLowerCase();
    if (userType === "admin") return routeListAdmin;
    if (userType === "contributer") return routeListContribute;
    return routeListHome;
  };

  if (modes === "landing") {
    return (
      <LandingNav
        routeList={routeListLanding}
        user={user}
        navigate={navigate}
      />
    );
  }

  const routeList = getRouteList();
  const navProps = {
    routeList,
    channelsLinks,
    navigate,
    accordionOpen,
    setAccordionOpen,
    isAccordion,
    isVertical,
  };

  if (user.type === "Admin") {
    return <AdminNav {...navProps} />;
  }

  // Both home and home2 use the same component since they're identical
  return <HomeNav {...navProps} routeList={routeList as RouteProps[]} />;
};
