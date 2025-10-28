import { FaBorderAll, FaUsers, FaUserTie } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MonthlyReportItem, MostUsedService } from "../types";

export const SidebarItems = [
  { title: "Statistics", link: "statistics", icon: <IoStatsChart /> },
  { title: "Appointments", link: "booking", icon: <FaBorderAll /> },
  { title: "Specialists", link: "expert", icon: <FaUserTie /> },
  { title: "Clients", link: "client", icon: <FaUsers /> },
  { title: "Profile", link: "profile", icon: <CgProfile /> },
]

export const data: MonthlyReportItem[] = [
  { month: "Jan", sales: 500 },
  { month: "Feb", sales: 700 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 900 },
  { month: "May", sales: 1000 },
  { month: "Jun", sales: 200 },
];

export const mostUsedServicesData: MostUsedService[] = [
  { service: "Manikyur", percent: 40 },
  { service: "Makiyaj", percent: 20 },
  { service: "Stilist", percent: 10 },
  { service: "Designer", percent: 30 },
];
