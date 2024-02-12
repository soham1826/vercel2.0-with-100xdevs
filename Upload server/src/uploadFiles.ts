import { S3 } from "aws-sdk";
import fs from "fs";
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
// replace with your own credentials
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
