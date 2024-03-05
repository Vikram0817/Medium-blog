import Heading from './Heading'
import Input from './Input'
import Button from './Button'
import { useState } from 'react'
import { SignupInput } from '@vikram_chaudhary/common'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

function Auth({type}: {type: "signup" | "signin"}) {
  const [userInfo, setUserInfo] = useState<SignupInput>({name: "", email: "", password: ""});
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signin" ? "signin" : "signup"}`, userInfo);
      const data = response.data;
      if(data.token){
        localStorage.setItem("myToken", data.token);
      }
      alert(data.response);
      navigate("/blog")
    } catch (error) {
      alert("Failed to create user⚠️")
    }
  }
  
  return (
    <div className='h-screen flex flex-col justify-center items-center p-20'>
      <Heading 
        head="Create an account" 
        def="Already have an account?" 
        label={type === "signin" ? "Sign-up" : "Sign-in"}
        link={type === "signin" ? '/signup' : "/signin"}
      ></Heading>
      { type === "signup" &&
        <Input onChange={(e) => {
          setUserInfo({
            ...userInfo,
            name: e.target.value
          })}
          } label='email' placeholder="Enter your email" />
      }
      <Input onChange={(e) => {
        setUserInfo({
          ...userInfo,
          email: e.target.value
        })
      }} label='Email' placeholder="m@example.com"></Input>
      <Input onChange={(e) => {
        setUserInfo({
          ...userInfo,
          password: e.target.value
        })
      }} label='Password' type="password" placeholder=""></Input>
      <Button onClick={sendRequest} label='Sign-Up'></Button>
    </div>
  )
}

export default Auth;