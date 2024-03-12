import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from './BlogCard'

function AppBar() {
  const navigate = useNavigate();

  function newBlog(){
    navigate("/publish");  
  }

  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link to="/">
        <div className='font-bold text-2xl cursor-pointer'>
            Medium
        </div>
      </Link>
      <div className='flex'>
        <button onClick={newBlog} type="button" className=" text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add new +</button>
        <div className='ml-2'>
            <Avatar name="Vikram"/>
        </div>
      </div>
    </div>
  )
}

export default AppBar