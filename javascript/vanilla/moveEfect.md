 ## Base64 to Webp [🐾](./main.md)

Efecto de movimiento, el "100" que multiplica x e y, es la cantidad de movimiento del objeto en px

 ```html
   <body>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      html,
      body,
      main {
        height: 100%;
      }
      main {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .img {
        height: 150px;
        transition: all 0.1s;
      }
    </style>
    <main>
      <img
        src="https://i.pinimg.com/originals/e2/dd/88/e2dd88046b3ccb68edbd93d33ccf5c49.png"
        alt=""
        class="img"
      />
    </main>
    <script>
      const img = document.querySelector(".img");

      window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;

        const { innerWidth, innerHeight } = window;

        const y = ((clientX - innerWidth / 2) / innerWidth) * 100;
        const x = ((clientY - innerHeight / 2) / innerHeight) * 100;

        img.style.transform = `translate(${y}px, ${x}px)`;
      });
      window.addEventListener("mouseout", (e) => {
        img.style.transform = `translate(0px, 0px)`;
      });
    </script>
  </body>
 ```