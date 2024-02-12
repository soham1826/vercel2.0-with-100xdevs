
import express from "express";
import cors from "cors";
import { generateId } from "./randomId";
import simpleGit from "simple-git"; // used to execute git commands
import * as path from 'path'
import { getAllFiles } from "./getALlFiles";
import { uploadFile } from "./uploadFiles";
import { createClient } from "redis";


const publisher = createClient();
publisher.connect();
const subscriber = createClient();
subscriber.connect();


const app = express();
app.use(cors());
app.use(express.json());


app.post("/deploy",async(req, res)=>{
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const id = generateId();
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`))

    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    try {
        await Promise.all(files.map(async (file) => {
            const fileName = file.slice(__dirname.length + 1);
            const localFilePath = file;
            await uploadFile(fileName, localFilePath);
        }));
        console.log("All files uploaded successfully.");

    } catch (error) {
        console.error("Error uploading files:", error);
    }
    publisher.lPush("build-queue",id)
    publisher.hSet("status",id, "uploaded");
    res.json({
        id:id,
    })

})

app.get("/status", async(req,res)=>{
    const id = req.query.id;
    const response = await subscriber.hGet("status",id as string);
    res.json({
        status:response
    })
})

app.listen(3000,()=>{
    console.log("server is running")
})