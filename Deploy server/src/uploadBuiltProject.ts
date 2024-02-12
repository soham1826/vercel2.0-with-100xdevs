import fs, { readdirSync } from 'fs';
import path from 'path'
import { S3 } from "aws-sdk";

export const getAllFiles = (folderPath: string): string[] => {
    let response: string[] = [];

    const allFilesAndFolders = readdirSync(folderPath);
    allFilesAndFolders.forEach((file) => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath));
        } else {
            response.push(fullFilePath);
        }
    });

    return response; // Return the response array after processing
};


const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const newFileName = fileName.replace(/\\/g, '/'); // replacing "\\" with / so that folder structure will be created; 
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "verceldata",
        Key: newFileName,
    }).promise();
    console.log(response);
}


export async function copyFinalDist(id:string){
    const folderPath = path.join(__dirname,`output/${id}/dist`);
    const allFiles =  await getAllFiles(folderPath);
    allFiles.forEach(async file =>{
        await uploadFile(`dist/${id}/`+file.slice(folderPath.length+1),file);
    })
}