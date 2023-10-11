

const inputSlider = document.querySelector("[data-lenghtSlider] ")

const lengthDisplay = document.querySelector("[data-lenghtNumber] ")

const passwordDisplay = document.querySelector("[data-passwordDisplay] ")

const copyBtn = document.querySelector("[data-copy] ")

const copyMsg = document.querySelector("[data-copyMsg] ")

const uppercaseCheck = document.querySelector("#uppercase ")

const lowercaseCheck = document.querySelector("#lowercase ")

const numberCheck = document.querySelector("#Number ")

const symbolsCheck = document.querySelector(" #symbols")

const indicator = document.querySelector("[ data-indicator] ")

const generateBtn = document.querySelector(" .generateButton")

const allCheckBox = document.querySelectorAll("input[type=checkbox] ")

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';




let password = ""
let passwordLength = 10
let checkCount = 0

handleSlider()
// set strength color gray
setIndicator('#ccc')

//set password length
function handleSlider() {
    inputSlider.value = passwordLength
    lengthDisplay.innerText = passwordLength
    // or kuch bhi karna chahiye

    const min = inputSlider.min
    const max = inputSlider.max
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color
    // shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}




function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123))
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpeer = false
    let hasLower = false
    let hasNumber = false
    let hassym = false

    if (uppercaseCheck.checked) hasUpeer = true
    if (lowercaseCheck.checked) hasLower = true
    if (numberCheck.checked) hasNumber = true
    if (symbolsCheck.checked) hassym = true

    if (hasUpeer && hasLower && (hasNumber || hassym) && passwordLength >= 8) {
        setIndicator("#0f0")
    }
    else if ((hasLower || hasUpeer) && (hasNumber || hassym) && passwordLength >= 6) {
        setIndicator("#ff0")

    }
    else {
        setIndicator("#f00")
    }
}


async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "copied"

    } catch (e) {
        copyMsg.innerText = "Failed"
    }


    copyMsg.classList.add("active")

    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000)
    // console.log("sacessful copied")

}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value

    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent()
    }
})

function shufflePassword(array) {
    // fishser Yates mathod
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;


}



function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked)
            checkCount++;
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }
}

allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', handleCheckBoxChange)
})

generateBtn.addEventListener('click', () => {

    //none of checkbox are selected

    if (checkCount <= 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }

    //let star the jouney to find new pasword

    // remove old password

    password = ""

    let funArr = []

    if (uppercaseCheck.checked)
        funArr.push(generateUpperCase)

    if (lowercaseCheck.checked)
        funArr.push(generateLowerCase)

    if (numberCheck.checked)
        funArr.push(generateRandomNumber)

    if (symbolsCheck.checked)
        funArr.push(generateSymbol)

    // composary addition

    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]()
    }
    console.log("compulsory addition done")

    // remaining additions
    for (let i = 0; i < passwordLength - funArr.length; i++) {
        let randIndex = getRndInteger(0, funArr.length)
        password += funArr[randIndex]();
    }
    console.log("remaining addition done")

    // shuffle the password

    password = shufflePassword(Array.from(password));

    console.log("shuffling done")


    passwordDisplay.value = password
    console.log("UI addition done")
    // calculate strength
    calcStrength()

})

 

// dark mode logic

const toggleBtn = document.querySelector("#checkbox")

toggleBtn.addEventListener("change",()=>{
      
     if (toggleBtn.checked) {
        document.body.classList.add('dark-mode')
     }
     else
     {
        document.body.classList.remove('dark-mode')
     }
     console.log("dark mode active")
})

