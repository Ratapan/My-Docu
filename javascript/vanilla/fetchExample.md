## Base64 to Webp [🐾](./main.md)
[Ejemplo de uso 🦝](https://ratapan.com/repo/pages/fetchRestaurant.html "Ratapan.com/repo/pages/")
 
Es un menú de comidas con una api publica 
```html
<script>
  window.onload = function() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => {
      return res.json()
    })
    .then(data => {
      const my_menu = document.getElementById("menu");
      var rows = []
      
      for (let i = 0; i < data.categories.length; i++){
      var cat = data.categories[i];
      rows.push(
      `<div class="row">
          <div class="row-img">
            <img src="${cat.strCategoryThumb}" alt="">
            </div>
          <div class="row-text">
            <div class="row-text-title">${cat.strCategory}</div>
            <div class="row-text-description">${cat.strCategoryDescription}</div>
          </div>
      </div>`)
      }
      console.log(data)
      my_menu.innerHTML = rows.join(" ");
    })
    .catch(err=> alert(err))
}
</script>
<style>
      *{
         font-family: 'Montserrat', sans-serif;
         margin: 0;
         padding: 0;
      }
      html{
        background-color: #f7f4ea;
      }
      .row{
         display: flex;
         margin:  5px 0 10px 0;
      }
      .row-img{
         height: 80px;
         margin: 0 0 0 10px;
      }
      .row-img img{
         height: 100%;
      }
      .row-text-title{
         font-weight: 600;
         font-size: 16px;
      }
      .row-text-description{
         font-weight: 500;
         font-size: 12px;
      }
</style>
<div id="menu">

</div>
```