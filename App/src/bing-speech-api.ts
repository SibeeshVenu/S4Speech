import { config } from "./config";
import * as fileHelper from "./helper.file";
import * as request from "request";
import * as vkbeatify from "vkbeautify";
import { Promise } from 'es6-promise'
import * as queryString from "querystring"
import * as fs from "fs";

//speechToText("amy.wav");
textToSpeech("This is a test to check the conversion of text to speech");
function textToSpeech(text: string) {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Ocp-Apim-Subscription-Key": config.speech.bingSpeech.key1,
        }
    };
    request.post(
        `${config.speech.bingSpeech.authEndPoint}/issueToken`,
        requestOptions,
        (err, response, body) => {
            const accessToken = response.body;
            const payLoad = `
            <speak version="1.0" xml:lang="en-US">
            <voice xml:lang="en-US" xml:gender="Male" name="Microsoft Server Speech Text to Speech Voice (en-US, ZiraRus)">
            ${text}
            </voice>
            </speak>
            `;
            const requestOptions: request.CoreOptions = {
                headers: {
                    "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
                    "Content-Type": "application/ssml+xml",
                    "Host": "speech.platform.bing.com",
                    "Content-Length": payLoad.length,
                    "Authorization": "Bearer " + accessToken,
                    "User-Agent": "NodeJS"
                },
                body: payLoad
            };

            request.post(
                config.speech.bingSpeech.synthesizeUrl,
                requestOptions
            ).pipe(fs.createWriteStream(__dirname + "/output.mp3"));
        }
    )
}

function speechToText(fileName: string) {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Content-Type": "audio/wav; codec=audio/pcm; samplerate=16000",
            "Transfer-Encoding": "chunked",
            "Ocp-Apim-Subscription-Key": config.speech.bingSpeech.key1
        },
        body: fileHelper.readFile(`${__dirname}/${fileName}`)
    };
    request.post(
        config.speech.bingSpeech.endPoind,
        requestOptions,
        (error, response, body) => {
            console.log(response.body);
        }
    );
}