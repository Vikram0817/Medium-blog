import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import AppBar from '../components/AppBar';
import Skeletons from '../components/Skeletons';

function ViewBlog() {
    const {id} = useParams();
    const {loading, blog} = useBlog({id: id || ""});

    if(loading){
        return (
            <>
                <AppBar />
                <div className='grid grid-cols-3 px-20 py-10'>
                    <div className='col-span-2 mr-5'>
                        <Skeletons/ >
                    </div>
                    <div className='flex justify-center'>
                        <Skeletons/ >
                    </div>
                </div>
            </>
        )
    }
  return (
    <>
    <AppBar />
        <div className='grid grid-cols-3 px-20 py-10'>
            <div className='p-5 col-span-2'>
                <h1 className='font-extrabold text-3xl mb-2'>
                    {blog?.title}
                </h1>
                <p className='text-slate-600 font-normal mb-3'>
                    {`Posted on ${blog?.publishDate}`}
                </p>
                <p className='font-serif text-slate-800'>
                    {blog?.content}    
                </p>
            </div>
            <div className='flex justify-center p-5'>
                <div>
                    <p className='font-semibold mb-4'>Author</p>
                    <div className='ml-5'>
                        <h2 className='text-xl font-bold mb-1'>
                            {blog?.author.name}
                        </h2>
                        <p className='text-slate-600'>Author's bio maybe...</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewBlog