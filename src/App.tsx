'use strict'
import Homepage from './Homepage'
const App = () => {
  return (
    <div className='min-h-screen w-full flex items-start justify-center'>
      <div className='xl:w-[80rem] w-full xl:px-0 px-4 py-[7vh]'>
        <Homepage />
      </div>
    </div>
  )
}

export default App