import middleware from "@/middleware";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

console.log(auth());

const handleAuth = ()=>{
    const {userId} = auth();
    if(!userId) throw new Error("Unauthorized");
    return {userId: userId};
}

 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({image: {maxFileSize: "1MB", maxFileCount: 2} })
  .middleware(async()=>handleAuth())
  .onUploadComplete(()=>{}),
  messageFile: f(["image", "pdf", "image/png", "image/jpeg"])
  .middleware(async()=>handleAuth())
  .onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;