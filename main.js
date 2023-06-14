const $ = (selector) => document.querySelector(selector)

/* ---- Result and Result preview ---- */
const result = $('#result')
const resultPreview = $('#result-preview')
/* ---- Clear and Delete ---- */
const buttonClear = $('#button-clear').addEventListener('click', clear)
const buttonDelete = $('#button-delete').addEventListener('click', deleteNumber)
/* ---- Numbers ----*/
const buttonDot = $('.num-dot').addEventListener('click', () => {newNumber('.')})
const button0 = $('.num-0').addEventListener('click', () => {newNumber('0')})
const button1 = $('.num-1').addEventListener('click', () => {newNumber('1')})
const button2 = $('.num-2').addEventListener('click', () => {newNumber('2')})
const button3 = $('.num-3').addEventListener('click', () => {newNumber('3')})
const button4 = $('.num-4').addEventListener('click', () => {newNumber('4')})
const button5 = $('.num-5').addEventListener('click', () => {newNumber('5')})
const button6 = $('.num-6').addEventListener('click', () => {newNumber('6')})
const button7 = $('.num-7').addEventListener('click', () => {newNumber('7')})
const button8 = $('.num-8').addEventListener('click', () => {newNumber('8')})
const button9 = $('.num-9').addEventListener('click', () => {newNumber('9')})
/* ---- Operators ----*/
const buttonDiv = $('.div').addEventListener('click', () => {operation('/', auxNum)})
const buttonMul = $('.mul').addEventListener('click', () => {operation('x', auxNum)})
const buttonMinus = $('.minus').addEventListener('click', () => {operation('-', auxNum)})
const buttonSum = $('.sum').addEventListener('click', () => {operation('+', auxNum)})
const buttonEqual = $('.equal').addEventListener('click', () => {operation('=', auxNum)})
/* ---- Copy to clipboard ---- */
const buttonCopy = document.getElementById('copy').addEventListener('click', copyToClipboard)
/* Keyboard numbers and operators */
document.addEventListener('keydown', () => {verifyIfNumberOrOperator(event)})

/* ---- Start to create a number when you click it ---- */
let auxNum = ''
function newNumber(num) {
    if (auxNum.length === 0) {
        result.innerText = ''
    }

    if (auxNum.length === 0 && num === '.') {
        auxNum = '0.'
        result.innerText = '0.'
    } else if (auxNum.includes('.') && num === '.') {
        return
    } else if (auxNum.length === 1 && auxNum === '0' && num === '0') {
        return
    } else if (auxNum.length < 10){
        auxNum += num
        result.innerText += num
        if (!result.innerText.includes('.')) {
            result.innerText = addThousands(result.innerText.replace(',', ''))
        }
    }
}

/* ---- Add thousands to a num ---- */
function addThousands(num) {
    if (num === '') {
        return num
    }
    const numberFormatter = Intl.NumberFormat('en-US');
    return numberFormatter.format(num);

}

/* ---- Verify if the key pressed is a number or a operator ---- */
function verifyIfNumberOrOperator(event) {
    if (/^[0-9.]$/.test(event.key)) {
        newNumber(event.key)
    } else if (/[+\-*\/=]/.test(event.key)) {
        event.key === '*' ?
            operation('x', auxNum) :
            operation(event.key, auxNum)
    } else if (event.key === 'Enter') {
        operation('=', auxNum)
    } else if (event.key === 'Backspace') {
        deleteNumber()
    }
}

/* ---- App main logic ---- */
let arrNumbers = [] // Numbers and operators are stored here
let finalResult = 0
let isEqualActivated = false
function operation(operator, number) {
    auxNum = '' // Resets the number given by the person to create a new one

    // If it's the first operation add 0 to avoid show " /" or " +", etc.
    if (number === '' && arrNumbers.length === 0) number = '0'

    if (number === '0.') {
        number = '0'
        result.innerText = '0'
    }

    changeOperator(operator, number, isEqualActivated)

    // Avoid adding unnecesary numbers if the result has already been given
    if (isEqualActivated === false) resultPreview.innerText += ` ${addThousands(number.replace(',', ''))} ${operator} `

    // Continue operating with the result (i.e., not restart all)
    if (operator !== '=' && isEqualActivated === true) {
        isEqualActivated = false
        resultPreview.innerText = ` ${arrNumbers[0]} ${operator} `
    }

    if (number !== '') {
        arrNumbers.push(parseFloat(number))
    }

    // Reorganize the array if the result has been given
    if (typeof(arrNumbers[0]) === 'number' && arrNumbers[1] === '=') {
        const firstNumber = arrNumbers.shift()
        arrNumbers.shift()
        arrNumbers.unshift(firstNumber)
    }

    // ---- When someone made an operation, but you want to continue operating with the result ----
    // The '=' is removed from the first position, so the result is put first
    if (typeof(arrNumbers[1]) === 'number') {
        arrNumbers.shift()
        resultPreview.innerText = `${addThousands(number.replace(',', ''))} ${operator}`
    }

    // Add the new operator in the array next to the result
    if (arrNumbers[arrNumbers.length - 1] !== operator && arrNumbers.length !== 0) {
        arrNumbers.push(operator)
    }
    // ---- ----

    // Know if before a sum or sub NOT come a mul or div. (2+2x5 -> 2+(2x5))
    if (arrNumbers.length === 4) {
        const auxOperator = arrNumbers[arrNumbers.length - 1]
        switch (auxOperator) {
            case '+':
                finalResult = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                result.innerText = addThousands(finalResult.toString().replace(',', ''))
                arrNumbers = [finalResult, '+']
                break
            case '-':
                finalResult = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                result.innerText = addThousands(finalResult.toString().replace(',', ''))
                arrNumbers = [finalResult, '-']
                break
            case 'x':
                if (arrNumbers[1] !== '+' && arrNumbers[1] !== '-') {
                    finalResult = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                    result.innerText = addThousands(finalResult.toString().replace(',', ''))
                    arrNumbers = [finalResult, 'x']
                    break
                }
                break
            case '/':
                if (arrNumbers[1] !== '+' && arrNumbers[1] !== '-') {
                    finalResult = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                    result.innerText = addThousands(finalResult.toString().replace(',', ''))
                    arrNumbers = [finalResult, '/']
                    break
                }
                break
            case '=':
                if (isEqualActivated === false) {
                    if (arrNumbers[1] === '=' && arrNumbers[3] === '=') {
                        arrNumbers = [arrNumbers[0]]
                        break
                    } else {
                        finalResult = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                        arrNumbers = [finalResult]
                    }
                    result.innerText = addThousands(finalResult.toString().replace(',', ''))
                    isEqualActivated = true
                    break
                }
            default:
                break
        }
    // Know if before a sum or sub COME a mul or div. (2+2x5 -> 2+(2x5))
    } else if (arrNumbers.length === 6) {
        const auxOperator = arrNumbers[arrNumbers.length - 3]
        switch (auxOperator) {
            case 'x':
                console.log(arrNumbers)
                let auxMul = 0
                auxMul = arrNumbers[2] * arrNumbers[4]
                // First make mul or div before sum or sub
                if (arrNumbers[5] === 'x' || arrNumbers[5] === '/') {
                    arrNumbers = [arrNumbers[0], arrNumbers[1], auxMul, operator]
                    console.log(arrNumbers)
                    break
                }
                finalResult = eval(arrNumbers[0], auxMul, arrNumbers[1])
                result.innerText = addThousands(finalResult.toString().replace(',', ''))
                arrNumbers = [finalResult, operator]
                console.log({arrNumbers})
                break
            case '/':
                let auxDiv = 0
                auxDiv = arrNumbers[2] / arrNumbers[4]
                finalResult = eval(arrNumbers[0], auxDiv, arrNumbers[1])
                // First make mul or div before sum or sub
                if (arrNumbers[5] === 'x' || arrNumbers[5] === '/') {
                    arrNumbers = [arrNumbers[0], arrNumbers[1], auxDiv, operator]
                    console.log(arrNumbers)
                    break
                }
                result.innerText = addThousands(finalResult.toString().replace(',', ''))
                arrNumbers = [finalResult, operator]
                console.log({arrNumbers})
                break
        }
    }
}

/* ---- Make operations ---- */
function eval(num1, num2, op) {
    switch (op) {
        case '+':
            return limitDecimals(num1 + num2)
        case '-':
            return limitDecimals(num1 - num2)
        case 'x':
            return limitDecimals(num1 * num2)
        case '/':
            return limitDecimals(num1 / num2)
        default:
            'Error'
    }
}

/* ---- Limit decimals up to 5 ---- */
function limitDecimals(number) {
    const decimals = number.toString().split('.')[1]
    if (decimals) {
        const numDecimals = Math.min(decimals.length, 5)
        const truncatedNumber = number.toString().split('.')[0] + '.' + decimals.slice(0, numDecimals)
        return parseFloat(truncatedNumber)
    }
    return number
}

/* ---- Change operator ---- */
function changeOperator(operator, number, isEqualActivated) {
    if (operator !== '' && number === '' && isEqualActivated === false) {
        arrNumbers[arrNumbers.length - 1] = operator
        const newPreviewMessage = resultPreview.innerText.slice(0, -2)
        if (newPreviewMessage[0] !== '(' || newPreviewMessage[newPreviewMessage.length -1 ] !== ')') {
            // Avoid adding parenthesis if there's only one number
            if (/[+\-*\/]/.test(newPreviewMessage) && operator !== '=') {
                resultPreview.innerText = `(${newPreviewMessage})`
            } else {
                resultPreview.innerText = `${newPreviewMessage}`
            }
        } else {
            resultPreview.innerText = `${newPreviewMessage}`
        }
    }
}

/* ---- Reset the calculator (values and screen) ---- */
function clear() {
    auxNum = ''
    arrNumbers = []
    finalResult = 0
    isEqualActivated = false
    result.innerText = finalResult
    resultPreview.innerText = ''
}

/* ---- Delete a number before make an operation if user wants ---- */
function deleteNumber() {
    // Clean all if result = NaN | Undefined | Infinity
    if (/[a-z]/.test(result.innerText.toLowerCase())) {
        clear()
    }
    auxNum = auxNum.slice(0, -1)
    let resultText = result.innerText
    result.innerText = resultText.slice(0, -1)
    if (result.innerText === '') result.innerText = '0'
}

/* ---- Copy to clipboard ---- */
function copyToClipboard() {
    navigator.clipboard.writeText(result.innerText)
}