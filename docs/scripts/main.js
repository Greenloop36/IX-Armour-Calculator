const result_container = document.getElementById("section-result")
const result_content = document.getElementById("calc-result")

const form_submit = document.getElementById("form-submit")
const form_clear = document.getElementById("form-clear")

const dialog = document.getElementById("dialog")
const dialog_title = document.getElementById("dialog-title")
const dialog_content = document.getElementById("dialog-content")
const dialog_close = document.getElementById("dialog-close")

function set_dialog(title, content) {
    if (title == null) {
        dialog.style.display = "none"
        return
    }

    dialog_title.innerHTML = title
    dialog_content.innerHTML = content

    dialog.style.display = "flex"
}

function toggle_section(name, toggle) {
    const element = document.getElementById(name)

    if (toggle == true) {
        element.removeAttribute("hidden")
    } else {
        element.setAttribute("hidden", "")
    }
}

function form_hint(text) {
    document.getElementById("form-result").innerHTML = text
}

function get_input_value(id) {
    return document.getElementById(id).value
}

function set_label(id, content) {
    document.getElementById(id).innerHTML = content
}

function calculate(dmg, pen, arm, abs) {
  if (arm <= 0) {
    return {
      armDmg: 0,
      healthDmg: dmg
    };
  }

  const penP = pen / 100;
  const absR = abs / 100;

  const initialAbsorbedDmg = dmg * (1 - penP);
  const initialPenetratedDmg = dmg * penP;

  const secondaryAbsorbedDmg = initialPenetratedDmg * absR;
  let finalHealthDmg = initialPenetratedDmg - secondaryAbsorbedDmg;

  const totalArmorDmg = initialAbsorbedDmg + secondaryAbsorbedDmg;

  const armorDmg = Math.min(arm, totalArmorDmg);

  if (totalArmorDmg > arm) {
    const excessDmg = totalArmorDmg - arm;
    finalHealthDmg += excessDmg;
  }

  return {
    armDmg: armorDmg,
    healthDmg: finalHealthDmg
  };
}

function validate_form() {
    let form = {
        damage: get_input_value("damage"),
        armour_health: get_input_value("armour-health"),
        armour_abs: get_input_value("armour-abs"),
        armour_pen: get_input_value("armour-pen")
    }

    for (const [key, value] of Object.entries(form)) {
        if (0 > value) {
            return [false, `"${key}" has an invalid value of ${value}.`]
        } else if (value == "") {
            return [false, `"${key}" is missing.`]
        }
    }

    return [true, form]
}

function set_bar(id, value) {
    if (0 > value) {
        value = 100
        set_label(id, "NEG")
    } else {
        set_label(id, "")
    }

    document.getElementById(id).style.width = `${value}%`
}

function display_result(health, armour_health, max_health, max_armour) {
    if (health == null) {
        toggle_section("section-result", false)
        return
    }

    const health_dmg = max_health - health
    const armour_dmg = max_armour - armour_health

    const armour_percent = (armour_health / max_armour) * 100
    const health_percent = (health / max_health) * 100

    set_label("result-player-health", health)
    set_label("result-player-dmg", `${health_dmg.toFixed(2)} damage`)

    set_label("result-armour-health", `${armour_health}`)
    set_label("result-armour-dmg", `${armour_dmg.toFixed(2)} damage`)

    set_bar("bar-health", health_percent)
    set_bar("bar-armour", armour_percent)

    set_label("result-plr-max", max_health)
    set_label("result-arm-max", max_armour)

    toggle_section("section-result", true)

    // result_content.innerHTML = `Player health: ${health} (-${health_dmg.toFixed(1)})<br>Armour health: ${armour_health} (-${armour_dmg.toFixed(2)})`
}

// Callbacks
form_submit.onclick = function() {
    let [success, form] = validate_form()
    
    if (success == false) {
        set_dialog("Validation", form)
        return
    }

    let calculation_data = calculate(form.damage, form.armour_pen, form.armour_health, form.armour_abs)
    console.log(calculation_data)
    const health = (100 - calculation_data.healthDmg)
    const armour = (form.armour_health - calculation_data.armDmg)

    display_result(
        health.toFixed(2),
        armour.toFixed(2),
        100,
        form.armour_health
    )
}

form_clear.onclick = function() {
    document.getElementById("damage").value = ""
    document.getElementById("armour-health").value = ""
    document.getElementById("armour-abs").value = ""
    document.getElementById("armour-pen").value = ""
    toggle_section("section-result", false)
    
    document.getElementById("damage").focus()
}

dialog_close.onclick = function() {
    set_dialog()
}