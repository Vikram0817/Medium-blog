import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from "hono/jwt"
import hashPassword from '../hashing'
import {signinInput, signupInput} from "@vikram_chaudhary/common"

const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_KEY: string 
	}
}>()

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({response: "Invalid Inputs!"})
  }

  const {email, name, password} = body;
  const hashedPass = await hashPassword(password)
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPass
      }
    })

    if(user) {
      const token = await sign({id: user.id}, c.env.JWT_KEY);
      return c.json({
        token: `Bearer ${token}`,
        user: user,
        response: "Signed up successfully!"
      })
    }else{
      return c.json({"response": "Enable to signup! try again."})
    }

  } catch(e) {
    c.status(403);
    return c.json({response: "user can not be created or might exist already."})
  }
})

userRouter.post("/signin", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  
  const { success } = signinInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({response: "Invalid Inputs!"})
  }

  const {email, password} = body;
  const hashedPass = await hashPassword(password);

  try {
    const user = await prisma.user.findFirst({
      where : {
        email: email
      }
    })
    
    if(user?.password === hashedPass) {
      const token = await sign({id: user.id}, c.env.JWT_KEY);
      return c.json({
        token: `Bearer ${token}`,
        user: user,
        response: "Signed in successfully!"
      })
    }else{
      c.status(404);
      return c.json({"response": "Wrong password!"})
    }

  } catch(e) {
    c.status(403);
    return c.json({response :"could not find user!"})
  }
})

export default userRouter;