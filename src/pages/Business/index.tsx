import { memo, useState } from 'react'
import CustomTable from '../../components/Table'
import { Business } from '../../types'
import { useGetBusinessesQuery } from '../../service/api/business.api'
import { businessTableColumns, ITEMS_PER_PAGE, orderOptions, typeOptions } from '../../constants'
import { useParamsHook } from '../../hooks/useParamsHook'
import { Pagination, Select, Tooltip } from 'antd'

const Businesses = () => {
  const { getParam, setParam } = useParamsHook();
  const page = getParam("page") || "1";
  const search = getParam("search") || ""

  const [ordering, setOrdering] = useState<string>("")
  const [type, setType] = useState<string>("")

  const { data } = useGetBusinessesQuery({ offset: (Number(page) - 1) * ITEMS_PER_PAGE, ordering, type, search })

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
        <Tooltip title="Type">
          <Select
            value={type}
            onChange={(value) => setType(value)}
            defaultValue=""
            style={{ width: 160 }}
            options={[{ value: "", label: "All" }, ...typeOptions]}
          />
        </Tooltip>
      </div>

      <CustomTable<Business> data={Array.isArray(data?.results) ? data.results : []} columns={businessTableColumns(Number(page))} />
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

export default memo(Businesses)