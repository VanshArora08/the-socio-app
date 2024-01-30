import search from "/assets/search.svg"
import home from "/assets/home.svg";
import heart from "/assets/heart.svg";
import create from "/assets/create.svg";
import reply from "/assets/reply.svg";
import community from "/assets/community.svg";
import request from "/assets/request.svg";
import members from "/assets/members.svg";
import tag from "/assets/tag.svg";
import user from "/assets/user.svg";

export const sidebarLinks = [
    {
      imgURL: home,
      route: "/",
      label: "Home",
    },
    {
      imgURL: search,
      route: "/search",
      label: "Search",
    },
    {
      imgURL: heart,
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: create,
      route: "/create-post",
      label: "Create Leaf",
    },
    {
      imgURL: community,
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: user,
      route: "/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "leafs", label: "Leafs", icon: reply },
    { value: "replies", label: "Replies", icon: members },
    
  ];
  
  export const communityTabs = [
    { value: "leafs", label: "Leafs", icon: reply },
    { value: "members", label: "Members", icon: members },
    
  ];