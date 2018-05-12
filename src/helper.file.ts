import * as fs from 'fs';
import { Buffer } from "buffer";

export function readFile(path: string) {
    const fileData = fs.readFileSync(path).toString("hex");
    const result = [];
    for (let index = 0; index < fileData.length; index += 2) {
        result.push(parseInt(fileData[index] + "" + fileData[index + 1], 16));
    }
    return new Buffer(result);
}