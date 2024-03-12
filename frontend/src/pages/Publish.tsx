import { ChangeEvent, useState } from 'react'
import AppBar from '../components/AppBar'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function Publish() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const token = `${localStorage.getItem("myToken")}`;
    console.log(token);
    
    async function handleSubmit() {
        const res = await axios.post(BACKEND_URL + "api/v1/blog", 
        {  
            title, 
            content
        },
        {   
            headers: {
              Authorization: token
            }
        }
        )
        if(res.data.post){
            alert(res.data.response);
            navigate("/blog")
        }else{
            alert(res.data.response)
        }
    }

    return (
    <div>
        <AppBar></AppBar>
        <div className='p-10'>
            <textarea id="message" onChange={(e) => setTitle(e.target.value)} value={title} className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mb-2 focus:outline-none" placeholder="Title"></textarea>
            <TextEditor content={content} onChange={e => setContent(e.target.value)}/>
            <button onClick={handleSubmit} type="submit" className="mt-2 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-900 rounded-lg">
            Publish post
            </button>
        </div>
    </div>
  )
}
 
function TextEditor({content, onChange} : {content: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (        
    <form>
        <textarea id="editor" value={content} onChange={onChange} rows={8} className="p-2 focus:outline-none rounded-lg border border-gray-300 block w-full text-sm text-gray-800 bg-white" placeholder="Write an article..." required ></textarea>
    </form>

    )
}