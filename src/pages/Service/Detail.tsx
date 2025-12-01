import { useGetOneServicesQuery } from '../../service/api/service.api'
import { useParams } from 'react-router-dom'
import { Tabs, Card, Tag, Empty, Badge } from 'antd'
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { Appointment } from '../../types'
import { getStatusColor, getStatusText } from './helpers'
import { formatDate } from '../../helpers'
import Loading from '../../components/Loading'

const ServiceDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneServicesQuery(id);

  return (
    <div className="h-full bg-gray-50 p-6">
      {
        isLoading ?
          <Loading/> :
          <>
            <div className="flex flex-col gap-4 bg-white rounded-lg shadow-sm p-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {data?.name}
              </h1>
              <div className='flex items-center gap-2 text-gray-500'>
                <ClockCircleOutlined className="text-purple-500" />
                <p>{formatDate(data?.created_at)}</p>
              </div>
              <p className="text-gray-600">{data?.description}</p>
              <Tag className='w-[max-content]' color={data?.is_active ? "green" : "red"}>{data?.is_active ? "Active" : "Inactive"}</Tag>
            </div>

            <Card className="shadow-sm overflow-y-auto max-h-[570px] h-[570px] bg-red-300">
              <Tabs defaultActiveKey="1" size="large">
                <Tabs.TabPane
                  tab={
                    <span className="flex items-center gap-2">
                      <CalendarOutlined />
                      Appointments
                      <Badge
                        color='orange'
                        count={data?.appointments?.length || 0}
                        className="ml-2"
                        showZero
                      />
                    </span>
                  }
                  key="1"
                >
                  <div className="flex flex-col gap-4 mt-4">
                    {data?.appointments && data.appointments.length > 0 ? (
                      data.appointments.map((appointment: Appointment) => (
                        <Card
                          key={appointment.id}
                          className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                          hoverable
                        >
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <UserOutlined className="text-blue-500" />
                              <div>
                                <p className="text-xs text-gray-500">Client</p>
                                <p className="font-semibold text-gray-800">
                                  {appointment.client_name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <TeamOutlined className="text-green-500" />
                              <div>
                                <p className="text-xs text-gray-500">Specialist</p>
                                <p className="font-semibold text-gray-800">
                                  {appointment.specialist_name}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-between items-start">
                              <Tag color={getStatusColor(appointment.status)} className="text-sm">
                                {getStatusText(appointment.status)}
                              </Tag>
                              {appointment.created_at && (
                                <span className="text-xs text-gray-500">
                                  {new Date(appointment.created_at).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>

                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full">
                        <Empty
                          description="No appointments found"
                          className="py-12"
                        />
                      </div>
                    )}
                  </div>
                </Tabs.TabPane>

                <Tabs.TabPane
                  tab={
                    <span className="flex items-center gap-2">
                      <TeamOutlined />
                      Specialists
                      <Badge
                        color='green'
                        count={data?.specialists?.length || 0}
                        className="ml-2"
                        showZero
                      />
                    </span>
                  }
                  key="2"
                >
                  <div className="">
                    {
                      data?.specialists?.map((specialist: any) => (
                        <div className='w-full flex shadow rounded p-6 mb-4 hover:shadow-lg transition-shadow duration-300 border-gray-500'>
                          <div className='w-full flex  justify-between'>
                            <div>
                              <p className="text-xs text-gray-500">First name</p>
                              <p className="font-semibold text-gray-800">
                                {specialist.specialist.first_name}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">Last name</p>
                              <p className="font-semibold text-gray-800">
                                {specialist.specialist.last_name}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">Phone number</p>
                              <p className="font-semibold text-gray-800">
                                {specialist.specialist.phone_number}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">Position</p>
                              <p className="font-semibold text-gray-800">
                                {specialist.position}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">Experience</p>
                              <p className="font-semibold text-gray-800">
                                {specialist.years_of_experience}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </>
      }
    </div>
  )
}

export default ServiceDetail;
