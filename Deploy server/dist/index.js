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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dowlaodS3Folder_1 = require("./dowlaodS3Folder");
const buildProject_1 = require("./buildProject");
const uploadBuiltProject_1 = require("./uploadBuiltProject");
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const publisher = (0, redis_1.createClient)();
publisher.connect();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (1) {
            const response = yield subscriber.brPop((0, redis_1.commandOptions)({ isolated: true }), 'build-queue', 0);
            //@ts-ignore
            const id = response.element;
            yield (0, dowlaodS3Folder_1.downloadS3Folder)(`output/${id}`);
            console.log("downloaded");
            yield (0, buildProject_1.buildProject)(id);
            console.log("done building");
            yield (0, uploadBuiltProject_1.copyFinalDist)(id);
            console.log("uploaded dist to S3");
            publisher.hSet("status", id, "deployed");
        }
    });
}
main();
``;
