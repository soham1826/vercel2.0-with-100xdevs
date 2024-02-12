"use strict";
//access-key:AKIA4MTWL5J2RABD7QDF;
//seceret-accesskey:eIlSWgvKiFNFDPCkbhfc1017R1XFnnwLotO3qIqH
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const randomId_1 = require("./randomId");
const simple_git_1 = __importDefault(require("simple-git")); // used to execute git commands
const path = __importStar(require("path"));
const getALlFiles_1 = require("./getALlFiles");
const uploadFiles_1 = require("./uploadFiles");
const redis_1 = require("redis");
const publisher = (0, redis_1.createClient)();
publisher.connect();
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// uploadFile("soham/App.css","E:/Soham files/vercel2.0/dist/output/8pr6g/src/App.css");
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const id = (0, randomId_1.generateId)();
    yield (0, simple_git_1.default)().clone(repoUrl, path.join(__dirname, `output/${id}`));
    const files = (0, getALlFiles_1.getAllFiles)(path.join(__dirname, `output/${id}`));
    try {
        yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const fileName = file.slice(__dirname.length + 1);
            const localFilePath = file;
            yield (0, uploadFiles_1.uploadFile)(fileName, localFilePath);
        })));
        console.log("All files uploaded successfully.");
    }
    catch (error) {
        console.error("Error uploading files:", error);
    }
    publisher.lPush("build-queue", id);
    publisher.hSet("status", id, "uploaded");
    res.json({
        id: id,
    });
}));
app.get("/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const response = yield subscriber.hGet("status", id);
    res.json({
        status: response
    });
}));
app.listen(3000, () => {
    console.log("server is running");
});
