import { useBlogs } from '../hooks';
import BlogCard from './BlogCard';

function Blogs() {
    const {loading, blogData} = useBlogs();

    if(loading){
        return (
            <>
                loading...
            </>
        )
    }
  return (
    <div>
        <div className='w-screen flex justify-center'>
            <div className='max-w-2xl'>
            {blogData.map(blog => {
                return <BlogCard authorName={blog.author.name} publishedDate={blog.publishDate} title={blog.title} content={blog.content} id={blog.id} />
            })}
            </div>
        </div>
    </div>
  )
}

export default Blogs