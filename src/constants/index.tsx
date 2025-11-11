import { FaBorderAll, FaUsers } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { GrServicePlay } from "react-icons/gr";
import { IoStatsChart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { ACTIONS, APPOINTMENT_STATUS, BUSINESS_TYPE, MonthlyReportItem, MostUsedService, ROLES } from "../types";
import { Button, Tag, Tooltip } from "antd";
import { RiDeleteBin7Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import { AppDispatch } from "../redux";
import { setUsersModal } from "../redux/features/modal.slice";
import { formatDate } from "../helpers";

export const SidebarItems = [
  { title: "Statistics", link: "statistics", icon: <IoStatsChart /> },
  { title: "Appointments", link: "appointments", icon: <FaBorderAll /> },
  { title: "Services", link: "services", icon: <GrServicePlay /> },
  { title: "Businesses", link: "businesses", icon: <MdHomeRepairService /> },
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

export const userTableColumns = (dispatch: AppDispatch, handleDelete: (id: number) => void, page: number) =>
  [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_value: any, _item: any, index: number) => {
        return <span>
          <span>{index + 1 + (Number(page) - 1) * 10}</span>

        </span>;
      },
    },
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
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => {
        return formatDate(date)
      },
      sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
  ];

export const appointmentTableColumns = (page: number = 1) =>
  [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_value: any, _item: any, index: number) => {
        return <span>
          <span>{index + 1 + (Number(page) - 1) * 10}</span>

        </span>;
      },
    },
    {
      title: 'Specialist',
      dataIndex: ['specialist', 'first_name'],
      key: 'specialist',
    },
    {
      title: 'Client',
      dataIndex: ['client', 'first_name'],
      key: 'client',
    },
    {
      title: 'Service',
      dataIndex: ['service', 'name'],
      key: 'service',
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color: string = "grey"

        switch (status?.toLowerCase()) {
          case "pending":
            color = "yellow";
            break;
          case "approved":
            color = "green";
            break;
          case "rejected":
            color = "red";
            break;
          case "cancelled":
            color = "blue";
            break;
          case "moved":
            color = "orange";
            break;
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => {
        return formatDate(date)
      },
      sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
  ];

export const serviceTableColumns = (page: number = 1) => [
  {
    title: "№",
    dataIndex: "index",
    key: "index",
    render: (_value: any, _item: any, index: number) => {
      return <span>
        <span>{index + 1 + (Number(page) - 1) * 10}</span>

      </span>;
    },
  },
  {
    title: 'Title',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Business',
    dataIndex: ['business', 'name'],
    key: 'business',
  },
  {
    title: "Active",
    dataIndex: "is_active",
    key: "is_active",
    render: (isActive: boolean) => {
      let color: string = 'grey'

      switch (isActive) {
        case true:
          color = "blue";
          break;
        case false:
          color = "yellow";
          break;
      }
      return <Tag color={color}>{isActive === true ? "ACTIVE" : "INACTIVE"}</Tag>;
    }
  },
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date: string) => {
      return formatDate(date)
    },
    sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  },

]

export const businessTableColumns = (page: number = 1) => [
  {
    title: "№",
    dataIndex: "index",
    key: "index",
    render: (_value: any, _item: any, index: number) => {
      return <span>
        <span>{index + 1 + (Number(page) - 1) * 10}</span>

      </span>;
    },
  },
  {
    title: 'Title',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: BUSINESS_TYPE) => {
      let color: string = 'grey'

      switch (type.toLowerCase()) {
        case BUSINESS_TYPE.CLINIC:
          color = "blue";
          break;
        case BUSINESS_TYPE.BARBERSHOP:
          color = "green";
          break;
        case BUSINESS_TYPE.BEAUTY_SHOP:
          color = "orange";
          break;
        case BUSINESS_TYPE.SPORT:
          color = "yellow";
          break;
      }
      return <Tag color={color}>{type.toUpperCase()}</Tag>;
    }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Opening hours',
    dataIndex: 'opening_hours',
    key: 'opening_hours',
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date: string) => {
      return formatDate(date)
    },
    sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  },

]

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

export const orderOptions = [
  { value: '-created_at', label: 'Newest first' },
  { value: 'created_at', label: 'Oldest first' },
]

export const statusOptions = [
  {
    label: "Pending", value: APPOINTMENT_STATUS.PENDING
  },
  {
    label: "Approved", value: APPOINTMENT_STATUS.APPROVED
  },
  {
    label: "Rejected", value: APPOINTMENT_STATUS.REJECTED
  },
  {
    label: "Canceled", value: APPOINTMENT_STATUS.CANCELED
  },
  {
    label: "Moved", value: APPOINTMENT_STATUS.MOVED
  }
]

export const activeOptions = [
  {
    label: "Active", value: true,
  },
  {
    label: "Inactive", value: false,
  },
]

export const typeOptions = [
  {
    label: "Clinic", value: BUSINESS_TYPE.CLINIC
  },
  {
    label: "Barber Shop", value: BUSINESS_TYPE.BARBERSHOP
  },
  {
    label: "Beauty Shop", value: BUSINESS_TYPE.BEAUTY_SHOP
  },
  {
    label: "Sport", value: BUSINESS_TYPE.SPORT
  },
]

export const ITEMS_PER_PAGE = 10
