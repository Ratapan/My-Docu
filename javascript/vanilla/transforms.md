## Base64 to Webp [🐾](./main.md)
[Ejemplo de uso 🦝](http://ratapan.com/tools/bs64ToWebp/main.html "Ratapan.com/tools")


```javascript
function toWbpImage(file_base64) {
  //Usamos fetch para "leer" el formato bs64 y crear un blob
  fetch(file_base64)
    .then((res) => res.blob())
    .then((blob_file) => {
      //Declaramos un canvas para dibujar posteriormente la imagen
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let currentImg = "";
      let webpImg = "";
      let convertedImg = "";
      //Deja en 0 las variables si están siendo utilizadas
      if (currentImg != "" || webpImg != "" || convertedImg != "") {
        URL.revokeObjectURL(currentImg);
        convertedImg = "";
        currentImg = "";
        webpImg = "";
      }
      //lee el archivo y crea un objeto url
      currentImg = URL.createObjectURL(blob_file);
      //Declaramos la imagen
      webpImg = new Image();
      //utiliza onload  para extraer y hacer el cambio de tipo de archivo
      webpImg.onload = () => {
        canvas.width = webpImg.naturalWidth;
        canvas.height = webpImg.naturalHeight;
        //Dibuja la imagen en el canvas
        ctx.drawImage(webpImg, 0, 0, canvas.width, canvas.height);
        //convierte la imagen del canvas a webp
        convertedImg = canvas.toDataURL("image/webp", 1.0);
        //Presentamos el resultado en pantalla
        dowlodadImg(convertedImg);
      };
      webpImg.src = currentImg;
    });
}
```