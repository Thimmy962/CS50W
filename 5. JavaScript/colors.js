document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelector("select").onchange = function()
    {
       document.querySelector('#hello').style.color = this.value 
    }
})

document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelectorAll("button").forEach(button =>
    {
        button.onclick = function()
        {
            document.querySelector("#hello").style.color = button.dataset.color
        }
    })
})