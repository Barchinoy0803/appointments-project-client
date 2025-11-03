import { FaBorderAll, FaUsers} from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MonthlyReportItem, MostUsedService, User } from "../types";
import { ColumnType } from "antd/es/table";
import { Tag } from "antd";

export const SidebarItems = [
  { title: "Statistics", link: "statistics", icon: <IoStatsChart /> },
  { title: "Appointments", link: "booking", icon: <FaBorderAll /> },
  { title: "Users", link: "users", icon: <FaUsers /> },
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

export const columns: ColumnType<User>[] = [
  {
    title: 'First name',
    dataIndex: 'first_name',
    key: 'firstname',
  },
  {
    title: 'Last name',
    dataIndex: 'last_name',
    key: 'lastname',
  },
  {
    title: 'Phone number',
    dataIndex: 'phone_number',
    key: 'phoneNumber',
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: string) => {
      let color: string = "grey"

      switch (role?.toLowerCase()) {
        case "admin":
          color = "blue";
          break;
        case "client":
          color = "red";
          break;
        case "specialist":
          color = "green";
          break;
      }
      return <Tag color={color}>{role.toUpperCase()}</Tag>;
    }
  }
]

export const defaultModalState = {
  isOpen: false
}