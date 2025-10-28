import { memo } from 'react'
import MainRouter from './routes'

const App = () => {
  return (
    <div>
      <MainRouter/>
    </div>
  )
}

export default memo(App)
