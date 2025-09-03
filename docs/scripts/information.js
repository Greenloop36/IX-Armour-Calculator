const pen_info = `Armour penetration is a percentage of damage applied to <b>armour</b>.<br>
Damage that penetrates armour will be <b>also</b> absorbed by the armour, before being applied to the player.<br>
This means that penetrating damage is also split into two, damage that doesn't penetrate and damage that does.<br>
With this in mind, a penetration of 100% will not penetrate 100% of the armour.<br>
But without penetration, no damage will be penetrated.

<br>Here is a list of baseline armour penetration values which you can use:
<ul>
    <li>Pistols/SMGs: 15%</li>
    <li>Assault Rifles: 30-40%</li>
    <li>Carbines: 25%</li>
    <li>Snipers: 60-70%</li>
    <li>DMRs: 50%</li>
    <li>Shotguns: 5-10%</li>
</ul>
`

const armour_breakdown = `Incoming damage is split into two, blocked & penetrating damage.<br>
Blocked damage is applied to armour, while the rest is applied to the player's health.<br><br>

For more information on armour penetration, click the "info" button next to the input box for penetration.<br><br>

The blocked damage is calculated using the formula below:<br>

Let:<br>
D_Armour = damage to be applied to armour<br>
D_inc = incoming damage<br>
p = armour penetration % (as decimal)<br>
r = armour absorption % (as decimal)<br><br>

<i>D_Armour</i> = <i>D_inc</i> * ( (1 - <i>p</i>) + (<i>p</i> * <i>r</i>) )<br><br>

D_Armour is then applied to the armour.<br>
The rest of the damage, to be applied to the player's health, is calculated with the formula below:<br><br>

Let:<br>
D_health = damage to be applied to the player<br><br>

<i>D_health</i> = <i>D_inc</i> - <i>D_Armour</i>
`

// Total Armor Damage = Weapon Damage * ( (1 - Armor Penetration) + (Armor Penetration * Armor Absorption Rate) )
// D_Armour = D_inc * ( (1 - p) + (p * r) )

const button_pen = document.getElementById("pen-help")
const button_brkdn = document.getElementById("info-armour")


button_pen.onclick = function() {
    set_dialog("Armour Penetration", pen_info)
}

button_brkdn.onclick = function() {
    set_dialog("Armour Information", armour_breakdown)
}