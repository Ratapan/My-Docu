## Cierre de etiquetas [🐾](./main.md)

Este es un validador de cierre de etiquetas [] ,(), y {}. Al igual que lo hacen los IDE, revisa el texto plano, carácter por carácter y entrega True si esta cerrada la etiqueta y false si no lo está, esto lo podemos usar para advertir al usuario.

```javascript
const op_1 = '{[[(fdgad)]]{asdf}[sdf]}';//true
const op_2 = '{[[(asdfasdf)]{asdf}sadf[]}';//false
const op_3 = '}';//false

const validarCierre = (arr)=>{
  const etiquetas = [];
  for (i in arr){
    if(arr[i] == '[' || arr[i] == '{' || arr[i] == '(') {
      etiquetas.push(arr[i])
    };
    if(arr[i] == ']' && etiquetas[etiquetas.length-1] != '['){
      return false
    }
    if(arr[i] == '}' && etiquetas[etiquetas.length-1] != '{'){
      return false
    }
    if(arr[i] == ')' && etiquetas[etiquetas.length-1] != '('){
      return false
    }
    if(arr[i] == ')' || arr[i] == ']' || arr[i] == '}'){
      etiquetas.pop()
    }
  }
    return true
};

validarCierre(op_1)
validarCierre(op_2)
validarCierre(op_3)
```