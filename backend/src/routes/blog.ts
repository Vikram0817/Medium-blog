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
    constiables: {
        userId: string
  }
}>()

blogRouter.use("/*", async (c, next) => {
  try {
    const authorization = c.req.header("authorization") || "";
    const token = authorization.split(" ")[1];
    const decoded = await verify(token, c.env.JWT_KEY);

    if(decoded.id){
      c.set("jwtPayload", decoded.id)
      await next(); 
    }else{
    c.status(403)
    return c.json({error: "auth failed"});
    }
  
  } catch (error) {
    c.status(403);
    return c.json({msg: "auth failed!"})
  }
})

blogRouter.post("/", async (c) => {
    const userId = c.get("jwtPayload");
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

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const date = (dd + '/' + mm + '/' + yyyy);

    try {
      const post = await prisma.post.create({
          data: {
              title: title,
              content: content,
              authorId: userId,
              publishDate: date
          }
      })
      return c.json({"response": "Posted successfully!", post});	 
    } catch (error) {
      c.status(403);
      return c.json({"response": error})
    }
})

// not finished...
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  return c.json({body})
})

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const allPosts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: { //author is a constible taht we set and selected the name from user tble
          select: {
            name: true
          }
        },
        publishDate: true
      }
    }); 
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
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true
        }
      },
      publishDate: true
    }
  })

  return c.json({"response": post})
})

export default blogRouter