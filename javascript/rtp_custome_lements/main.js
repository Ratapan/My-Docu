import './webComponents/components.js';
const $ = (sele)=> document.querySelector(sele)
const $$ = (sele)=> document.querySelectorAll(sele)

const cropInput = $('#input-crop')

cropInput.addEventListener("change",(event)=>{
  console.log(event.target.value)
})