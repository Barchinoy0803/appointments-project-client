import { FaBorderAll, FaUsers } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { ACTIONS, MonthlyReportItem, MostUsedService, ROLES } from "../types";
import { Button, Tag, Tooltip } from "antd";
import { RiDeleteBin7Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import { AppDispatch } from "../redux";
import { setUsersModal } from "../redux/features/modal.slice";


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

export const userTableColumns = (dispatch: AppDispatch, handleDelete: (id: number) => void) =>
  [
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
            color = "orange";
            break;
          case "specialist":
            color = "green";
            break;
        }
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      }
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (id: number) => {
        return <div className="flex gap-3">
          <Tooltip title="Delete">
            <Button onClick={() => handleDelete(id)} type="text" shape="circle">
              <RiDeleteBin7Line className="text-[20px] text-red-400" />
            </Button>
          </Tooltip>

          <Tooltip title="Edit">
            <Button onClick={() => dispatch(setUsersModal({ isOpen: true, type: ACTIONS.EDIT, id }))} type="text" shape="circle">
              <LiaEditSolid className="text-[20px] text-orange-400" />
            </Button>
          </Tooltip>
        </div>
      }
    }
];

export const roleOptions = [
  {
    label: "Admin",
    value: ROLES.ADMIN,
  },
  {
    label: "Client",
    value: ROLES.CLIENT,
  },
  {
    label: "Specialist",
    value: ROLES.SPECIALIST,
  },
];

export const ITEMS_PER_PAGE = 10
