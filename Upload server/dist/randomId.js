"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const MAX_LEN = 5;
function generateId() {
    let ans = "";
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
exports.generateId = generateId;
