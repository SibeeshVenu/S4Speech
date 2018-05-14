import { config } from "./config";
import * as fileHelper from "./helper.file";
import * as request from "request";
import * as vkbeatify from "vkbeautify";
import { Promise } from 'es6-promise'
import * as queryString from "querystring"
import * as fs from "fs";

//getSupportedLanguages();
//getlanguagesForSpeak();
//getLanguageNames("en");
//speakText("This is a test for speak recognition", "en");
//translate("Hello", "en", "de");

function getSupportedLanguages() {
    const requestOptions = getRequestOptions();
    request.get(
        config.speech.translateApi.endPoind + "/GetLanguagesForTranslate",
        requestOptions,
        writeToLog
    );
}


function getlanguagesForSpeak() {
    const requestOptions = getRequestOptions();
    request.get(
        config.speech.translateApi.endPoind + "/GetLanguagesForSpeak",
        requestOptions,
        writeToLog
    );
}



function speakText(text: string, fromLanguage: string) {
    const requestOptions = getRequestOptions();
    const params = {
        "language": fromLanguage,
        "text": text,
        "format": "audio/mp3"
    };

    const uri = config.speech.translateApi.endPoind + "/Speak?" + queryString.stringify(params);
    request.get(
        uri,
        requestOptions
    ).pipe(fs.createWriteStream("./output.mp3"));
}


function getLanguageNames(locale: string) {
    const requestOptions = getRequestOptions();
    requestOptions.headers["Content-Type"] = "text/xml";
    requestOptions.body = `<ArrayOfstring
                            xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays"
                            xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
                            <string>af</string>
                            <string>ar</string>
                        </ArrayOfstring>`;
    request.post(
        config.speech.translateApi.endPoind + "/GetLanguageNames?locale=" + locale,
        requestOptions,
        writeToLog
    );
}



function translate(text: string, from: string, to: string) {
    const requestOptions = getRequestOptions();
    const params = {
        "from": from,
        "to": to,
        "text": text
    };

    request.get(
        config.speech.translateApi.endPoind + "/Translate?" + queryString.stringify(params),
        requestOptions,
        writeToLog
    );
}

function getSupportedLanguagesWithToken() {
    getAccessToken().then(accessToken => {
        const requestOptions: request.CoreOptions = {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        }
        request.get(
            config.speech.translateApi.endPoind + "/GetLanguagesForTranslate",
            requestOptions,
            writeToLog
        );
    });
}

function getAccessToken(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
        const authRequestOptions = getRequestOptions();
        request.post(config.speech.translateApi.authEndPoint + "/issueToken",
            authRequestOptions,
            (error, response, body) => {
                if (error) reject(error);
                else resolve(response.body);
            });
    });
    return promise;
}

function writeToLog(error: any, response: request.Response, body: any) {
    console.log(vkbeatify.xml(body));
};

function getRequestOptions() {
    const requestOptions: request.CoreOptions = {
        headers: {
            "ocp-Apim-Subscription-Key": config.speech.translateApi.key1
        }
    };
    return requestOptions;
}