import fs, { readdirSync } from 'fs';
import path from 'path'

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
