import { memo, useEffect, useRef, useState } from 'react'
import CustomTable from '../../components/Table'
import { ACTIONS, Business } from '../../types'
import { useCreateBusinessMutation, useDeleteBusinessMutation, useGetBusinessesQuery, useUpdateBusinessMutation } from '../../service/api/business.api'
import { businessTableColumns, ITEMS_PER_PAGE, orderOptions, typeOptions } from '../../constants'
import { useParamsHook } from '../../hooks/useParamsHook'
import { Button, Form, FormProps, Modal, Pagination, PaginationProps, Select, Tooltip } from 'antd'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getErrors } from '../Clients/helpers'
import toast from 'react-hot-toast'
import BusinessModal from '../../components/BusinessModal'
import { RootState } from '../../redux'
import { setBusinessModal } from '../../redux/features/modal.slice'
import { getBusinessBody } from './helpers'
import Loading from '../../components/Loading'
import { setBreadcrumb } from '../../redux/features/breadcrumb.slice'

const Businesses = () => {
  const [form] = Form.useForm<Business>();

  const { getParam, setParam } = useParamsHook();
  const page = Number(getParam("page") || 1);
  const search = getParam("search") || "";

  const dispatch = useDispatch();
  const { type, id } = useSelector((state: RootState) => state.modal.businessModal);

  const [ordering, setOrdering] = useState<string>("");
  const [businesstype, setType] = useState<string>("");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [pageSize, setPageSize] = useState<number>(ITEMS_PER_PAGE);
  const isFirstRender = useRef(true);

  const { data, isLoading: businessLoading } = useGetBusinessesQuery({ offset: (Number(page) - 1) * ITEMS_PER_PAGE, ordering, search, type: businesstype });
  const [createBusiness, { isLoading }] = useCreateBusinessMutation();
  const [updateBusiness] = useUpdateBusinessMutation();
  const [deleteBusiness] = useDeleteBusinessMutation();

  useEffect(() => {
    dispatch(setBreadcrumb([]))
  }, [dispatch]);

  useEffect(() => {
    setParam("limit", pageSize)
  }, [pageSize]);

  useEffect(() => {
    if(isFirstRender.current) {
      setParam("businessType", businesstype)
      setParam("ordering", ordering)
      setParam("page", 1)
    }
  }, [businesstype, ordering]);

  const handleOpenModal = () => {
    dispatch(setBusinessModal({ isOpen: true, type: ACTIONS.CREATE }))
  };

  const onFinish: FormProps<Business>['onFinish'] = async (values) => {
    try {
      if (type === ACTIONS.EDIT) {
        await updateBusiness({ id, body: getBusinessBody(values, position) }).unwrap()
        toast.success("Successfully updated")
      } else {
        await createBusiness(getBusinessBody(values, position)).unwrap()
        toast.success("Successfully created")
      }
      dispatch(setBusinessModal({ isOpen: false }))
    } catch (error: any) {
      form.setFields(getErrors(error.data))
    }
    form.resetFields()
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this business?",
      okText: "Yes, delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteBusiness(id).unwrap()
          toast.success("Successfully deleted")
        } catch (err) {
          console.error(err)
        }
      }
    })
  };

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
        businessLoading ?
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
              <Tooltip title="Type">
                <Select
                  value={businesstype}
                  onChange={(value) => setType(value)}
                  defaultValue=""
                  style={{ width: 160 }}
                  options={[{ value: "", label: "All" }, ...typeOptions]}
                />
              </Tooltip>

              <Button onClick={handleOpenModal} type="default" icon={<FaPlus />} iconPosition={'start'}>
                Add
              </Button>
            </div>

            <div className='overflow-y-auto max-h-[730px]'>
              <CustomTable<Business> data={Array.isArray(data?.items) ? data.items : []} columns={businessTableColumns(dispatch, handleDelete, Number(page))} />
            </div>

            <div className='mt-6 flex justify-end fixed bottom-10 right-20'>
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={data?.totalCount}
                onChange={onChange}
                disabled={businessLoading}
              />
            </div>
            <BusinessModal onFinish={onFinish} loading={isLoading} form={form} position={position} setPosition={setPosition} />
          </>
      }
    </div>
  )
}

export default memo(Businesses);
