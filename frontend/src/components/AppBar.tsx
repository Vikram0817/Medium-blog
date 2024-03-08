import { Avatar } from './BlogCard'

function AppBar() {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
        <div className='font-bold text-2xl'>
            Medium
        </div>
        <div>
            <Avatar name="Vikram"/>
        </div>
    </div>
  )
}

export default AppBar