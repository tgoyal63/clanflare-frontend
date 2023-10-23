import { Props as NewServerCard } from "@/components/addNewServer/Card";

export const mockAddNewServerServers: NewServerCard[] = [
  {
    serverName: "Server 1",
    roles: ["Admin", "User"],
    totalMembers: "100",
    hasAccess: true,
  },
  {
    serverName: "Server 2",
    roles: ["Moderator", "User"],
    totalMembers: "50",
    hasAccess: false,
  },
  // Add more objects as needed
];
