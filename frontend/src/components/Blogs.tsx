import { useBlogs } from '../hooks';
import BlogCard from './BlogCard';
import Skeletons from './Skeletons';

function Blogs() {
    const {loading, blogData} = useBlogs();
    console.log(blogData);
    
    if(loading){
        return (
            <div className='m-auto max-w-2xl'>
                <Skeletons />
                <Skeletons />
                <Skeletons />
            </div>
        )
    }
  return (
    <div>
        <div className='w-screen flex justify-center'>
            <div className='max-w-2xl'>
            {blogData.map((blog, idx) => {
                return <BlogCard key={idx} authorName={blog.author.name} publishedDate={blog.publishDate} title={blog.title} content={blog.content} id={blog.id} />
            })}
            </div>
        </div>
    </div>
  )
}

export default Blogs