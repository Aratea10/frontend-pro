import { sum } from './sum.js';

console.log(sum(3, 2));

const app = document.querySelector('#app');

// TODO:
// Crea un boton en el html para que el contenido de app SOLO se pinte al apretar el botón.

const button = document.querySelector('#btn');
button.addEventListener('click', () => {
    app.textContent = 'Bienvenidos a la Quidditch League XIX';
});