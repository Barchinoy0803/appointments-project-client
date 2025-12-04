import { memo, useEffect } from 'react'
import { useGetMeQuery, useUpdateMeInfoMutation } from '../../service/api/auth.api'
import Loading from '../../components/Loading'
import { LuLogOut } from "react-icons/lu"
import { Button, Form, FormProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/features/user.slice'
import { useNavigate } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import { setUsersModal } from '../../redux/features/modal.slice'
import CustomModal from '../../components/Popup'
import { ACTIONS, EditMyInfo } from '../../types'
import { RootState } from '../../redux'
import { setBreadcrumb } from '../../redux/features/breadcrumb.slice'

const Profile = () => {
  const [form] = Form.useForm<EditMyInfo>();
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { type } = useSelector((state: RootState) => state.modal.usersModal);

  const { data, isLoading } = useGetMeQuery({})
  const [updateInfo] = useUpdateMeInfoMutation()

  useEffect(() => {
    if (type === ACTIONS.EDIT) {
      form.setFieldsValue(data)
    }
  }, [type, data]);

  useEffect(() => {
    dispatch(setBreadcrumb([]))
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  };

  const onFinish: FormProps<EditMyInfo>['onFinish'] = async (values) => {
    try {
      if (type === ACTIONS.EDIT) {
        await updateInfo({ body: values });
      };
      dispatch(setUsersModal({ isOpen: false }));
    } catch (error) {
      console.log(error);
    }
    form.resetFields();
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400 py-12 px-6 shadow-lg">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-white">Profile</h1>
                <div className='flex gap-3'>
                  <Button
                    icon={<MdEdit />}
                    size="large"
                    type="dashed"
                    onClick={() => dispatch(setUsersModal({ isOpen: true, type: ACTIONS.EDIT }))}
                    className="flex items-center gap-2 shadow-lg">
                    Edit my info
                  </Button>

                  <Button
                    type="primary"
                    danger
                    icon={<LuLogOut className="text-lg" />}
                    onClick={handleLogout}
                    size="large"
                    className="flex items-center gap-2 shadow-lg"
                  >
                    Logout
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {data?.avatar ? (
                  <img
                    src={data.avatar}
                    alt="avatar"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl bg-white flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {data?.first_name?.[0]}{data?.last_name?.[0]}
                    </span>
                  </div>
                )}

                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {data?.first_name} {data?.last_name}
                  </h2>
                  <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold capitalize border border-white/30">
                    {data?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-1">Phone Number</p>
                    <p className="text-xl text-slate-800 font-bold">{data?.phone_number}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-1">Created At</p>
                    <p className="text-xl text-slate-800 font-bold">
                      {new Date(data?.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <CustomModal onFinish={onFinish} form={form} loading={false} isProfilePage />
    </div>
  )
}

export default memo(Profile)