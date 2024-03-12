import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog {
    title: string,
    content: string,
    id: string,
    publishDate: string,
    author: {
        name: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogData, setBlogData] = useState<Blog[]>([]);
    
    const token = localStorage.getItem("myToken");

    useEffect(() => {
        axios.get(BACKEND_URL + "api/v1/blog/bulk", {
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            setBlogData(res.data.response)
            setLoading(false);
        })
    }, []);

    return {
        loading, blogData
    }
}

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    
    const token = localStorage.getItem("myToken");

    useEffect(() => {
        axios.get(BACKEND_URL + "api/v1/blog/" + id, {
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            setBlog(res.data.response)
            setLoading(false);
        })
    }, [id]);

    return {
        loading, blog
    }   
}