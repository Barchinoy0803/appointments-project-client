import { useGetOneBusinessesQuery } from '../../service/api/business.api'
import { useParams } from 'react-router-dom'
import { Badge, Pagination, Spin, Tag, Typography } from 'antd'
import { MdHomeRepairService } from 'react-icons/md'
import CustomTable from '../../components/Table'
import { Service } from '../../types'
import { ITEMS_PER_PAGE, serviceTableColumns } from '../../constants'
import { useParamsHook } from '../../hooks/useParamsHook'
import { TbCalendarTime } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import { formatDate } from '../../helpers'
import Map from '../../components/Map'

const Detail = () => {
  const { getParam, setParam } = useParamsHook();
  const page = getParam("page") || "1";
  const { id } = useParams()
  const { data, isLoading } = useGetOneBusinessesQuery(id)

  return (
    <div className='flex flex-col gap-6 w-full h-full shadow bg-white rounded p-5'>
      {
        isLoading ?
          <Spin size='large' /> :
          <>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>

                <div className='flex items-center gap-2'>
                  <MdHomeRepairService className='text-gray-800 text-[55px]' />
                  <Typography style={{ fontSize: 45 }}>{data?.name}</Typography>
                  <Badge count={data?.is_active ? "active" : "inactive"} color={data?.is_active ? "#52c41a" : "red"} />
                </div>

                <div className='flex gap-3 text-gray-600 text-[19px]'>
                  <p className='font-semibold'>since</p>
                  <p>{formatDate(data?.created_at)}</p>
                </div>
              </div>

              <div className='flex gap-5'>

                <div className='flex items-center text-l text-gray-600 gap-1'>
                  <TbCalendarTime />
                  <p>{data?.opening_hours}</p>
                </div>

                <div className='flex items-center text-l text-gray-600 gap-1'>
                  <FaPhone />
                  <p>{data?.contact}</p>
                </div>

                 <div>
                  <Tag color='orange'>{data?.type}</Tag>
                </div>
              </div>
            </div>

            <div className='flex text-l text-gray-500 gap-1'>
              <p>{data?.description}</p>
            </div>


            <Map latitude={data?.latitude} longitude={data?.longitude} name={data?.name} />

            <div>
              <Typography style={{ fontSize: 20, fontWeight: 500 }}>Services</Typography>
              <div className='overflow-y-auto max-h-[190px]'>
                <CustomTable<Service> data={data?.services} columns={serviceTableColumns(Number(page))} />
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <Pagination
                current={Number(page)}
                onChange={(value) => setParam("page", value.toString())}
                pageSize={ITEMS_PER_PAGE}
                total={data?.count}
              />
            </div>
          </>
      }

    </div>
  )
}

export default Detail

// /'41.2797'
//'69.2192'