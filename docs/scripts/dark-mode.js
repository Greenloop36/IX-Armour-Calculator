const button = document.getElementById("btn-dark-mode")
const body = document.body
let enabled = false

function dark_mode(toggle) {
    if (toggle == null) {
        toggle = !enabled
    }

    if (toggle == true) {
        body.classList.add("dark-mode")
        Cookies.set("dark-mode", "1", { expires: 3650 })
    } else {
        body.classList.remove("dark-mode")
        Cookies.remove("dark-mode")
    }

    enabled = toggle == true
}

button.addEventListener('click', () => {
    dark_mode()
});

if (Cookies.get("dark-mode") == 1) {
    dark_mode(true)
}