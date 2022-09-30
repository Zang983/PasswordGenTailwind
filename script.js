let submitBtn = document.querySelector("#submit")
let range = document.querySelector("input[type='range'")
/**
 * Function who calculate the target strength
 * @param {[HTMLElement]} options 
 * @return {int} 
 */
function defineTargetScore(options) {
    let optionsCount = 0
    for (let option of options) {
        option.checked && optionsCount++
    }
    let size = document.querySelector("#size").value
    let strength = 1;
    size >= 10 ? strength = optionsCount : null
    size >= 8 && size < 10 ? optionsCount > 2 ? strength = 3 : strength = optionsCount : null
    size < 8 ? optionsCount > 2 ? strength = 2 : strength = 1 : null
    size <= 4 ? strength = 1 : null

    return strength;
}
/**
 * 
 * @param {PasswordObject} password 
 * @param {int} targetScore 
 * @returns {boolean} 
 */
function checkStrength(password, targetScore) {
    let score = 1;
    let optionsUsedCount = optionsUsed(password)
    password.value.length >= 10 ? score = optionsUsedCount : null;
    password.value.length >= 8 && password.value.length < 10 ? optionsUsedCount > 2 ? score = 3 : score = optionsUsedCount : null
    password.value.length < 8 ? optionsUsedCount > 2 ? score = 2 : score = 1 : null
    if (score >= targetScore) {
        password.strength = score;
        return true
    }
    return false;
}
/**
 * function who check how many type of char was used to generate pwd
 * @param {passwordObject} password 
 * @return {int}
 */
function optionsUsed(password) {
    let count = 0
    if (password.upperUsed === true) {
        count++
    }
    if (password.lowerUsed === true) {
        count++
    }
    if (password.numbersUsed === true) {
        count++
    }
    if (password.symbolsUsed === true) {
        count++
    }
    return count

}
/**
 * Read name
 * @param {INT} max 
 * @return {INT}
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
/**
 * Generate password
 * @param {[char]} table 
 * @param {HTMLElement} size 
 * @return {passwordObject}
 */
function generate(table, size) {
    let password = {
        value: "",
        upperUsed: false,
        lowerUsed: false,
        numbersUsed: false,
        symbolsUsed: false,
        strength: 1,
    };
    while (password.value.length != size.value) {
        let number = getRandomInt(table.length)
        password.value += String.fromCharCode(table[number])
        if (table[number] >= 65 && table[number] <= 90) {
            password.upperUsed = true;
        }
        if (table[number] >= 97 && table[number] <= 122) {
            password.lowerUsed = true
        }
        if (table[number] >= 48 && table[number] <= 57) {
            password.numbersUsed = true;
        }
        if (table[number] >= 33 && table[number] <= 47) {
            password.symbolsUsed = true;
        }
        if (table[number] >= 58 && table[number] <= 64) {
            password.symbolsUsed = true;
        }
        if (table[number] >= 91 && table[number] <= 96) {
            password.symbolsUsed = true;
        }
    }
    return password
}
/**
 * Check each checkbox, and add associate chars if it's checked
 * @param {[HTMLElements]} options 
 * @returns {[char]}
 */
function checkboxCheck(options) {
    let table = [];
    for (let option of options) {
        if (option.checked) {
            switch (option.id) {
                case ("uppercase"):
                    for (let i = 65; i <= 90; i++) {
                        table.push(i)
                    }
                    break;
                case ("lowercase"):
                    for (let i = 97; i <= 122; i++) {
                        table.push(i)
                    }
                    break;
                case ("numbers"):
                    for (let i = 48; i <= 57; i++) {
                        table.push(i)
                    }
                    break;
                case ("symbols"):
                    for (let i = 33; i <= 47; i++) {
                        table.push(i)
                    }
                    for (let i = 58; i <= 64; i++) {
                        table.push(i)
                    }
                    for (let i = 91; i <= 96; i++) {
                        table.push(i)
                    }
            }
        }
    }
    return table
}
/**
 * Display result and modify style when it's necessary
 * @param {passwordObject} password 
 */
function displayResult(password) {
    let displayPassword = document.querySelector("#password span")
    let text = "", className = "", display = document.querySelector(".strengthScale");
    display.setAttribute("class", "strengthScale flex gap-[0.5556vw] h-[1.9444vw] items-center ")
    displayPassword.classList.add("text-[#817D92]")
    // init display
    switch (password.strength) {
        case (1):
            text = "Too weak!";
            className = "tooWeak";
            break;
        case (2):
            text = "Weak";
            className = "weak"
            break;
        case (3):
            text = "medium";
            className = "medium";
            break;
        case (4):
            text = "strong";
            className = "strong"
    }
    //modify display
    displayPassword.classList.remove("text-[#817D92]")
    displayPassword.classList.add("text-[#E6E5EA]")
    displayPassword.innerText = password.value;
    display.classList.add(className)
    document.querySelector("#scoreStrength").innerText = text
}
/*
Main event, listen when a user want to generate a password
*/
submitBtn.addEventListener("click", () => {
    /*
    var definitions.
    */
    let size = document.querySelector("#size")
    let options = document.querySelectorAll("input[type=checkbox]")
    let secure = false;
    let password = "";
    /*
    Start logic !
    */
    let table = checkboxCheck(options);
    let targetScore = defineTargetScore(options, size)
    if (table.length > 0) {
        while (!secure) {
            password = generate(table, size)
            secure = checkStrength(password, targetScore)
        }
        displayResult(password)
    }
})
/* Custom style for this input range element */
function rangeDisplay() {
    let percent = (range.value / range.max) * 100
    range.style.background = `linear-gradient(to right,#A4FFAF ${percent}%,#18171F ${percent}%)`
    document.querySelector(".lengthValue").innerText = range.value
}
/* Function who call rangeDisplay when user change input range */
range.addEventListener("input", (e) => {
    rangeDisplay();
})
/* Copy to clipboard event*/
document.querySelector("svg").addEventListener("click", () => {
    let password = document.querySelector("#password span").textContent
    navigator.clipboard.writeText(password)
        .then(() => console.log(password))
        .catch(error => console.log(error))
})
rangeDisplay();


console.log()

const invitesSoireeFoot=['Tim','Bill']
let invitesReceptionBusiness = invitesSoireeFoot;
invitesSoireeFoot.push('Peter');
invitesReceptionBusiness.push('Sean');
invitesSoireeFoot.push('Jack');

let regex = new RegExp(/^[0-9]{2}[a-zA-Z]{2}[0-9]{3}$/)
console.log(regex.test("07DE338"))

console.log(invitesReceptionBusiness)