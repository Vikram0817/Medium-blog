import AppBar from '../components/AppBar';
import Blogs from '../components/Blogs';

function Blog() {
  return (
    <div>
      <div>
        <AppBar />
      </div>
      <div>
      <nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row items-center font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a href="#" className="ml-4 text-gray-900 dark:text-white hover:underline text-2xl" aria-current="page">+</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">For you</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Following</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
      </div>
      <div>
        <Blogs />
      </div>
    </div>
  )
}

export default Blog;