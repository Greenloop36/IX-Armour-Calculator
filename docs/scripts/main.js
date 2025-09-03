const quiz_list_container = document.getElementById("quiz-list")
const file_input = document.getElementById("file-input")

function toggle_section(name, toggle) {
    const element = document.getElementById(name)

    if (toggle == true) {
        element.removeAttribute("hidden")
    } else {
        element.setAttribute("hidden", "")
    }
}

function new_quiz_select(quiz, callback) {
    const name = quiz["DisplayName"]
    const description = quiz["Description"]
    const count_questions = quiz["Questions"].length

    let li = document.createElement("li")
    let go_button = document.createElement("button")
    
    
    const content = `
        <p>
            <strong>${name}</strong><br>
            ${description}<br>
            <em>${count_questions} questions</em>
        </p>
    `

    li.innerHTML = content
    quiz_list_container.appendChild(li)

    go_button.innerHTML = "Go"
    li.appendChild(go_button)

    go_button.addEventListener("click", function() {
        callback(quiz)
    })
}

function clear_quiz_list() {
    for (let child of quiz_list_container.children) {
        child.remove()
    }
}

// Callbacks
function on_quiz_select(quiz) {
    
}

async function on_input_file() {
    let file = file_input.files[0]
    let content = await file.text()
    let parsed = JSON.parse(content)

    clear_quiz_list()

    for (const key in parsed) {
        const value = parsed[key]
        new_quiz_select(value, on_quiz_select)
    }
}

// Bindings
file_input.addEventListener("change", on_input_file)