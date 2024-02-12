import { createClient,commandOptions } from "redis";
import { downloadS3Folder } from "./dowlaodS3Folder";
import { buildProject } from "./buildProject";
import { copyFinalDist } from "./uploadBuiltProject";
const subscriber = createClient();
subscriber.connect();
const publisher = createClient();
publisher.connect();

async function main(){
    while(1){
        const response = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        //@ts-ignore
        const id = response.element
        await downloadS3Folder(`output/${id}`)
        console.log("downloaded");
        await buildProject(id);
        console.log("done building");
        await copyFinalDist(id);
        console.log("uploaded dist to S3");
        publisher.hSet("status",id,"deployed");
    }
}

main();
``