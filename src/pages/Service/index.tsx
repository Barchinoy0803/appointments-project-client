import { memo, useEffect, useRef, useState } from 'react'
import CustomTable from '../../components/Table'
import { Service } from '../../types'
import { useGetServicesQuery } from '../../service/api/service.api'
import { activeOptions, ITEMS_PER_PAGE, orderOptions, serviceTableColumns } from '../../constants'
import { useParamsHook } from '../../hooks/useParamsHook'
import { Pagination, PaginationProps, Select, Tooltip } from 'antd'
import Loading from '../../components/Loading'
import { useDispatch } from 'react-redux'
import { setBreadcrumb } from '../../redux/features/breadcrumb.slice'

const Services = () => {
  const { getParam, setParam } = useParamsHook();
  const page = Number(getParam("page") || 1);
  const search = getParam("search") || ""

  const [ordering, setOrdering] = useState<string>("")
  const [is_active, setActive] = useState<string>()
  const [pageSize, setPageSize] = useState<number>(ITEMS_PER_PAGE);
  const isFirstRender = useRef(true);

  const { data, isLoading } = useGetServicesQuery({ offset: (Number(page) - 1) * ITEMS_PER_PAGE, search, ordering, is_active })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBreadcrumb([]))
  }, [dispatch]);

  useEffect(() => {
    setParam("limit", pageSize)
  }, [pageSize]);

  useEffect(() => {
    if (isFirstRender.current) {
      setParam("ordering", ordering)
      setParam("is_active", is_active!)
      setParam("page", 1)
    }
  }, [ordering, is_active]);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    setPageSize(size)
    setParam("page", current)
  };

  const onChange = (current: number) => {
    setParam('page', current)
  };

  return (
    <div className='h-full'>
      {
        isLoading ?
          <Loading />
          :
          <>
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

            <div className='overflow-y-auto max-h-[730px]'>
              <CustomTable<Service> data={Array.isArray(data?.items) ? data.items : []} columns={serviceTableColumns(Number(page))} />
            </div>

            <div className='mt-6 flex justify-end fixed bottom-10 right-20'>
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={data?.totalCount}
                onChange={onChange}
                disabled={isLoading}
              />
            </div>
          </>
      }
    </div>
  )
}

export default memo(Services);
