document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelector('form').onsubmit = () =>
    {
        const name = document.querySelector("#name").value
        alert(`Hello, ${name}`)
    }
})