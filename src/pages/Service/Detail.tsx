import { useGetOneServicesQuery } from '../../service/api/service.api'
import { useParams } from 'react-router-dom'
import { Tabs, Card, Tag, Empty, Spin, Badge } from 'antd'
import { 
  CalendarOutlined, 
  UserOutlined, 
  TeamOutlined, 
  ClockCircleOutlined 
} from '@ant-design/icons'
import { Appointment } from '../../types'
import { getStatusColor, getStatusText } from './helpers'

const ServiceDetail = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOneServicesQuery(id)


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {data?.name || 'Service Details'}
          </h1>
          {data?.description && (
            <p className="text-gray-600">{data.description}</p>
          )}
        </div>

        {/* Tabs */}
        <Card className="shadow-sm">
          <Tabs defaultActiveKey="1" size="large">
            <Tabs.TabPane 
              tab={
                <span className="flex items-center gap-2">
                  <CalendarOutlined />
                  Appointments
                  <Badge 
                    count={data?.appointments?.length || 0} 
                    className="ml-2"
                    showZero
                  />
                </span>
              } 
              key="1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {data?.appointments && data.appointments.length > 0 ? (
                  data.appointments.map((appointment: Appointment) => (
                    <Card
                      key={appointment.id}
                      className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                      hoverable
                    >
                      <div className="space-y-3">
                        {/* Status Badge */}
                        <div className="flex justify-between items-start">
                          <Tag color={getStatusColor(appointment.status)} className="text-sm">
                            {getStatusText(appointment.status)}
                          </Tag>
                          {/* {appointment.date && (
                            <span className="text-xs text-gray-500">
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                          )} */}
                        </div>

                        {/* Client Info */}
                        <div className="flex items-center gap-2">
                          <UserOutlined className="text-blue-500" />
                          <div>
                            <p className="text-xs text-gray-500">Client</p>
                            <p className="font-semibold text-gray-800">
                              {appointment.client_name}
                            </p>
                          </div>
                        </div>

                        {/* Specialist Info */}
                        <div className="flex items-center gap-2">
                          <TeamOutlined className="text-green-500" />
                          <div>
                            <p className="text-xs text-gray-500">Specialist</p>
                            <p className="font-semibold text-gray-800">
                              {appointment.specialist_name}
                            </p>
                          </div>
                        </div>

                        {/* Service Info */}
                        <div className="flex items-center gap-2">
                          <ClockCircleOutlined className="text-purple-500" />
                          <div>
                            <p className="text-xs text-gray-500">Service</p>
                            <p className="font-medium text-gray-700">
                              {appointment.service_name}
                            </p>
                          </div>
                        </div>

                        {/* Time */}
                        {/* {appointment.crea && (
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                              <ClockCircleOutlined className="mr-1" />
                              {appointment.time}
                            </p>
                          </div>
                        )} */}
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
                </span>
              } 
              key="2"
            >
              <div className="py-12">
                <Empty 
                  description="Specialists content coming soon"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default ServiceDetail