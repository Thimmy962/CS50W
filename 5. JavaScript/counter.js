let counter = 0;

function count()
{
   counter ++;
   document.querySelector("h1").innerHTML = counter
   if(counter % 10 === 0){
    alert(`The counter is ${counter}`) 
   }
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('button').onclick = count;
})