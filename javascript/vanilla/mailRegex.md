## Validar correo con Regex [🐾](./main.md)

```javascript
 const mailValidate = (mail)=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

mailValidate('hola@gmail.com') //true
mailValidate('hola@gmail.com@') //false
mailValidate('hola@gmail.') //false
mailValidate('@gmail.com') //false
mailValidate('hola@.com') //false

//No tiene consideracion  por los puntos entre el texto
//esto se puede ver como algo bueno o malo
//depende de los requerimientos

mailValidate('ho..la@hoho.com') //true
mailValidate('ho..la@ho.ho.com') //true

```