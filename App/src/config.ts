export let config = {
    speech: {
        translateApi: {
            authEndPoint: "https://api.cognitive.microsoft.com/sts/v1.0",
            endPoind: "https://api.microsofttranslator.com/V2/Http.Svc",
            key1: "",
            key2: ""
        },
        bingSpeech: {
            endPoind: "https://speech.platform.bing.com/speech/recognition/interactive/cognitiveservices/V1?language=en-us&format=detailed",
            authEndPoint: "https://api.cognitive.microsoft.com/sts/v1.0",
            key1: "",
            key2: "",
            synthesizeUrl: "https://speech.platform.bing.com/synthesize"
        },
        speakerRecognition: {
            endPoind: "",
            authEndPoint: "https://westus.api.cognitive.microsoft.com/spid/v1.0",
            key1: "",
            key2: ""
        }
    }
};