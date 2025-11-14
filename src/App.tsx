import { memo } from 'react'
import MainRouter from './routes'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='h-screen'>
      <MainRouter />
      < Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default memo(App)
