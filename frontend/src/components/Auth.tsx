import Heading from './Heading'
import Input from './Input'
import Button from './Button'
import { useState } from 'react'
import { SignupInput } from '@vikram_chaudhary/common'

function Auth({type}: {type: "signup" | "signin"}) {
  const [userInfo, setUserInfo] = useState<SignupInput>({name: "", username: "", password: ""});
  console.log(userInfo);
  
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
          } label='Username' placeholder="Enter your username" />
      }
      <Input onChange={(e) => {
        setUserInfo({
          ...userInfo,
          username: e.target.value
        })
      }} label='Email' placeholder="m@example.com"></Input>
      <Input onChange={(e) => {
        setUserInfo({
          ...userInfo,
          password: e.target.value
        })
      }} label='Password' type="password" placeholder=""></Input>
      <Button label='Sign-Up'></Button>
    </div>
  )
}

export default Auth;