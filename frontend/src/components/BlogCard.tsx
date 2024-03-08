import { Link } from 'react-router-dom';

interface props {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string
}

function BlogCard({ authorName, title, content, publishedDate, id}: props) {
  return (
    <Link to={`/blog/${id}`}>
    <div className='p-4 border-b'>
      <div className='flex items-center mb-3'>
        <Avatar name={authorName} /> 
        <div className='ml-2'>
          {authorName}
        </div>
        <div className='font-slate-400 font-light ml-2'>
          {publishedDate}
        </div>
      </div>
      <div>
        <div className='text-bold text-2xl mb-2'>
          {title}
        </div>
        <div className='font-serif text-lg mb-6'>
          {content.slice(0, 100) + "..."}
        </div>
      </div>
      <div className=''>
        <p className='font-slate-200'>{Math.floor(content.length/120)} min read</p>
      </div>
    </div>
    </Link>
  )
}

export function Avatar({name}: {name: string}){
  let shortName = "";
  try{
    shortName = name.split(" ")[0][0] +  name.split(" ")[1][0]
  }catch{
    shortName = name[0] 
  }
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{shortName}</span>
    </div>

  )
}

export default BlogCard;