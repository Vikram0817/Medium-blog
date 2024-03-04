import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {verify} from "hono/jwt"
import { createBlog } from '@vikram_chaudhary/common'

const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_KEY: string 
	},
    Variables: {
        userId: string
  }
}>()

blogRouter.use("/*", async (c, next) => {
  try {
    const authorization = c.req.header("authorization") || "";
    const token = authorization.split(" ")[1];
    const decoded = await verify(token, c.env.JWT_KEY);

    if(decoded.id){
      c.set("userId", decoded.id)
      await next(); 
    }else{
    c.status(403)
    return c.json({error: "auth failed"});
    }
  
  } catch (error) {
    c.status(403);
    return c.json({msg: "Internal serever error, try again!"})
  }
})

blogRouter.post("/", async (c) => {
    const userId = c.get("userId");
    const body = await c.req.json();
    
    const { success } = createBlog.safeParse(body);
  
    if(!success){
      c.status(411);
      return c.json({response: "Invalid Inputs!"})
    }
  
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const {title, content} = body;

    try {
      const post = await prisma.post.create({
          data: {
              title: title,
              content: content,
              authorId: userId
          }
      })
      return c.json({"response": "Posted successfully!", post});	 
    } catch (error) {
      c.status(403);
      return c.json({"response": error})
    }
})

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  return c.json({body})
})

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const allPosts = await prisma.post.findMany({}); 
    return c.json({"response": allPosts})
  }catch(err){
    c.status(403);
    return c.json({"response": err})
  }
})

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  
  const post = await prisma.post.findUnique({
    where: {
        id: id
    }
  })

  return c.json({"response": post})
})

export default blogRouter