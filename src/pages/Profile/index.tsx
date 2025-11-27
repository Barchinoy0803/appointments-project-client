import { memo } from 'react'
import { useGetMeQuery } from '../../service/api/auth.api'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const Profile = () => {
  const { data, isLoading } = useGetMeQuery({})

  if (isLoading) return
  (
    <div className="p-6 text-xl">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  )

  return (
    <div className="w-full py-2 px-3">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Profile
      </h1>

      <div className="flex items-center gap-6 mb-12">
        {data?.avatar ? (
          <img
            src={data.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-semibold text-gray-700">
            {data?.first_name?.[0]}{data?.last_name?.[0]}
          </div>
        )}

        <div>
          <p className="text-2xl font-semibold text-gray-900">
            {data?.first_name} {data?.last_name}
          </p>
          <p className="text-gray-500 capitalize">
            {data?.role}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Phone Number</span>
          <span className="text-lg text-gray-900">
            {data?.phone_number}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Created At</span>
          <span className="text-lg text-gray-900">
            {new Date(data?.created_at).toLocaleString()}
          </span>
        </div>

      </div>
    </div>
  )
}

export default memo(Profile)
