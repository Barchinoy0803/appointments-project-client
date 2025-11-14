import { memo } from 'react'
import { useGetMeQuery } from '../../service/api/auth.api'

const Profile = () => {
  const { data } = useGetMeQuery({})
  console.log(data);

  return (
    <div>Profile</div>
  )
}

export default memo(Profile)