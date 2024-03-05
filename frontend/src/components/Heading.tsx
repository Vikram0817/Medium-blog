import { Link } from 'react-router-dom'

interface props {
    head: string;
    def: string;
    label: string;
    link: string;
}

function Heading({head, def, link, label}: props) {
  return (
    <div className='text-left lg:text-center mb-6'>
        <h1 className='font-bold text-3xl'>{head}</h1>
        <span className='text-slate-600'>
          <span className='mr-2'>{def}</span>
          <Link className="underline" to={link}>{label}</Link>
        </span>    
    </div>
  )
}

export default Heading