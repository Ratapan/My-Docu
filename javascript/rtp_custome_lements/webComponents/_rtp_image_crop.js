const styles = (height) => `
.rtp-crop{
  min-height: 30px;
  max-height:100%;
  height: ${height};
  min-width: 50px;
  max-width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position:relative;
}
.rtp-crop__label{
  cursor: pointer;
  padding: var(--input-padding);
  border-radius: var(--input-radius);
  color: var(--c-font);
  background-color: var(--c-i-c);
  margin-right:auto;
}
.rtp-crop__input{
  display: none;
}
.rtp-crop__preview{
  max-width:100%;
  max-height:100%;
}`;

/**
 * Reduces the resolution of an image file to specified dimensions.
 *
 * This function takes an image file as input along with the desired new width
 * and height. It returns a Promise that resolves with an object containing the
 * original image size, the new image size, and the reduced resolution image file.
 * If the input image is not square, it will be cropped to fit the specified
 * dimensions. The new image is returned in the WebP format.
 *
 * @param {File} imageFile - The image file to reduce resolution of.
 * @param {string} type - The type of the final image.
 * @param {number} newWidth - The desired width for the new image.
 * @param {number} newHeight - The desired height for the new image.
 * @returns {Promise<{img?: File, name?: string}>} A Promise that resolves with an object containing the new image file (`img`) and the name. The Promise is rejected if there is an error in processing the image.
 */
export async function reduceImageResolution(
  imageFile,
  type,
  newWidth,
  newHeight
) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.src = URL.createObjectURL(imageFile);

    image.onload = () => {
      
      const size = Math.min(image.naturalWidth, image.naturalHeight);

      canvas.width = newWidth;
      canvas.height = newHeight;

      const sourceX = (image.naturalWidth - size) / 2;
      const sourceY = (image.naturalHeight - size) / 2;
      const sourceWidth = size;
      const sourceHeight = size;

      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        newWidth,
        newHeight
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const reducedImage = new File([blob], imageFile.name, {
              type: "image/webp",
            });
            resolve({
              img: reducedImage,
            });
          } else {
            reject(new Error("Error processing image"));
          }
        },
        `image/${type}`,
        1
      );
    };

    image.onerror = () => {
      reject(new Error("Error loading image"));
    };
  });
}

class RtpCropInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._value = null;

    // Styles
    this.myStyles = document.createElement("style");
    this.myStyles.innerHTML = styles();

    // Container
    this.inputContainer = document.createElement("div");

    // Image
    this.inputPreview = document.createElement("img");
    this.inputPreview.alt = "Preview input image";
    this.inputPreview.loading = "lazy";
    this.inputPreview.style.display = "none";

    // Label
    this.inputLabel = document.createElement("label");
    this.inputLabel.textContent = "Select an image";

    // Input
    this.inputThis = document.createElement("input");
    this.inputThis.type = "file";
    this.inputThis.accept = "image/*";
    this.inputThis.id = "file-input"; // Setting an ID for the input
    this.inputLabel.setAttribute("for", "file-input"); // Referencing the input ID in the label

    //clases
    this.inputContainer.className = "rtp-crop";
    this.inputLabel.className = "rtp-crop__label";
    this.inputThis.className = "rtp-crop__input";
    this.inputPreview.className = "rtp-crop__preview";

    // Append children
    this.shadow.appendChild(this.myStyles);
    this.shadow.appendChild(this.inputContainer);
    this.inputContainer.appendChild(this.inputThis);
    this.inputContainer.appendChild(this.inputLabel);
    this.inputContainer.appendChild(this.inputPreview);
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.dispatchEvent(new Event("change"));
  }
  connectedCallback() {
    let height = this.getAttribute("output-height") || 800;
    let width = this.getAttribute("output-width") || 800;
    let type = this.getAttribute("output-type") || "webp";
    console.log(this.getAttribute("style-height"));
    this.myStyles.innerHTML = styles(
      this.getAttribute("style-height") || "40px"
    );

    const previewImage = (file) => {
      const reader = new FileReader();
      console.log(file)
      reader.onload = (e) => {
        this.value = file;
        this.inputPreview.src = e.target.result;
        this.inputPreview.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    };

    // Event listener for input
    this.inputThis.addEventListener("change", async (ev) => {
      const target = ev.target;
      if (target.files && target.files[0]) {
        const data = await reduceImageResolution(
          target.files[0],
          type,
          width,
          height
        );
        if (data.img) {
          this.inputLabel.innerHTML = `Change image </br> ${
            data.img.name.length > 25
              ? data.img.name.substring(0, 19) + "..."
              : data.img.name
          }`;
          this.processedImage = data.img;
          previewImage(data.img);
        }
      }
    });
  }
}

customElements.define("rtp-crop", RtpCropInput);
