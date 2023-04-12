## Items duplicados [🐾](./main.md)

Los objetos Set son colecciones de valores. Puede iterar a través de los elementos de un conjunto en orden de inserción. Un valor en un Set solo puede ocurrir una vez; es único en la colección del Set.
<br><br>
```javascript
const a = [1,2,3,4,4,5,5]
const b = [1,2,3,4,5,6,7]
const c = ['a','b','c','c']
const d = ['a','b','c','d']

const hasDuplicate = array => 
new Set(array).size < array.length;

console.log(hasDuplicate(a)) // true
console.log(hasDuplicate(b)) // false
console.log(hasDuplicate(c)) // true
console.log(hasDuplicate(d)) // false
```
[Mas informacion de "new Set()"](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)