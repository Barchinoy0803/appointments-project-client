import { memo, useState } from 'react'
import CustomTable from '../../components/Table'
import { Service } from '../../types'
import { useGetServicesQuery } from '../../service/api/service.api'
import { activeOptions, ITEMS_PER_PAGE, orderOptions, serviceTableColumns } from '../../constants'
import { useParamsHook } from '../../hooks/useParamsHook'
import { Pagination, Select, Tooltip } from 'antd'

const Services = () => {
  const { getParam, setParam } = useParamsHook();
  const page = getParam("page") || "1";
  const search = getParam("search") || ""


  const [ordering, setOrdering] = useState<string>("")
  const [is_active, setActive] = useState<string>()

  const { data } = useGetServicesQuery({ offset: (Number(page) - 1) * ITEMS_PER_PAGE, search, ordering, is_active})

  return (
    <div>
      <div className='flex gap-5 justify-end p-4 items-center'>
        <Tooltip title="Date">
          <Select 
            value={ordering}
            onChange={(value) => setOrdering(value)}
            defaultValue=""
            style={{ width: 160 }}
            options={[{ value: "", label: "All" }, ...orderOptions]}
          />
        </Tooltip>
        <Tooltip title="Active">
          <Select
            value={is_active}
            onChange={(value) => setActive(value)}
            defaultValue=""
            style={{ width: 160 }}
            options={[{ value: "", label: "All" }, ...activeOptions]}
          />
        </Tooltip>
      </div>

      <CustomTable<Service> data={Array.isArray(data?.results) ? data.results : []} columns={serviceTableColumns(Number(page))} />
      <div className='mt-6 flex justify-end'>
        <Pagination
          current={Number(page)}
          onChange={(value) => setParam("page", value.toString())}
          pageSize={ITEMS_PER_PAGE}
          total={data?.count}
        />
      </div>
    </div>
  )
}

export default memo(Services)
