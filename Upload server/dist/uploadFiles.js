"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
// replace with your own credentials
const s3 = new aws_sdk_1.S3({
    accessKeyId: "AKIA4MTWL5J2RABD7QDF",
    secretAccessKey: "eIlSWgvKiFNFDPCkbhfc1017R1XFnnwLotO3qIqH",
});
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const newFileName = fileName.replace(/\\/g, '/'); // replacing "\\" with / so that folder structure will be created; 
    const response = yield s3.upload({
        Body: fileContent,
        Bucket: "verceldata",
        Key: newFileName,
    }).promise();
    console.log(response);
});
exports.uploadFile = uploadFile;