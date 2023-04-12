## Reconocimiento de voz [🐾](./main.md)

El reconocimiento de voz implica recibir voz a través del micrófono de un dispositivo, luego es verificado por un servicio de reconocimiento de voz contra una lista de palabras o frases 'grammar' (esta lista básicamente es el vocabulario a reconocer en una app particular). Cuando se reconoce con éxito una palabra o frase, esta se devuelve como una cadena de texto y así poder iniciar otras acciones.
<br><br>
```javascript
const recognition = new webkitSpeechRecognition();
recognition.lang = 'es-Es';
recognition.continuous = true;

recognition.onresult = event => {
    for (const result of event.results){
        console.log(result[0].transcript)
    }
};

recognition.start();
```
[Mas informacion de webkitSpeechRecognition](https://developer.mozilla.org/es/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)