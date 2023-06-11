const $ = (selector) => document.querySelector(selector)

const result = $('#result')
const resultPreview = $('#result-preview')
/* Clear and Delete */
const buttonClear = $('#button-clear').addEventListener('click', clear)
const buttonDelete = $('#button-delete')
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

let auxNum = ''
function newNumber(num) {
    if (auxNum.length === 0) {
        result.innerText = ''
    }
    auxNum += num
    result.innerText += num
}

let arrNumbers = []
let resultadoFinal = 0
let isEqualActivated = false
function operation(operator, number) {
    if (isEqualActivated === false) resultPreview.innerText += ` ${number} ${operator} `

    if (operator !== '=' && isEqualActivated === true) {
        console.log('Hellooo')
        isEqualActivated = false
        resultPreview.innerText = ` ${arrNumbers[0]} ${operator} `
    }

    if (number !== '') {
        arrNumbers.push(parseFloat(number))
    }

    if (typeof(arrNumbers[0]) === 'number' && arrNumbers[1] === '=') {
        const firstNumber = arrNumbers.shift()
        arrNumbers.shift()
        arrNumbers.unshift(firstNumber)
        console.log(`I'm the new array ${arrNumbers}`)
    }

    // When you made an operation, but you want continue operating with the result
    if (typeof(arrNumbers[1]) === 'number') {
        arrNumbers.shift()
        resultPreview.innerText = `${number} ${operator}`
        console.log(`I'm the second new array ${arrNumbers}`)
    }

    console.log({arrNumbers})
    auxNum = ''

    if (arrNumbers[arrNumbers.length - 1] !== operator && arrNumbers.length !== 0) {
        console.log(arrNumbers.length)
        arrNumbers.push(operator)
    }

    if (arrNumbers.length === 4) {
        console.log('Tengo 4')
        const auxOperator = arrNumbers[arrNumbers.length - 1]
        console.log({auxOperator})
        switch (auxOperator) {
            case '+':
                console.log(`I'm sum`)
                resultadoFinal = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                result.innerText = resultadoFinal
                arrNumbers = [resultadoFinal, '+']
                console.log({arrNumbers})
                break
            case '-':
                console.log(`I'm sub`)
                resultadoFinal = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                result.innerText = resultadoFinal
                arrNumbers = [resultadoFinal, '-']
                console.log({arrNumbers})
                break
            case 'x':
                if (arrNumbers[1] !== '+' && arrNumbers[1] !== '-') {
                    console.log(arrNumbers[1])
                    console.log(`I'm mul`)
                    resultadoFinal = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                    result.innerText = resultadoFinal
                    arrNumbers = [resultadoFinal, 'x']
                    console.log({arrNumbers})
                    break
                }
                break
            case '/':
                if (arrNumbers[1] !== '+' && arrNumbers[1] !== '-') {
                    console.log(arrNumbers[1])
                    console.log(`I'm div`)
                    resultadoFinal = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                    result.innerText = resultadoFinal
                    arrNumbers = [resultadoFinal, '/']
                    console.log({arrNumbers})
                    break
                }
                break
            case '=':
                if (isEqualActivated === false) {
                    console.log(`I'm the result`)
                    if (arrNumbers[1] === '=' && arrNumbers[3] === '=') {
                        arrNumbers = [arrNumbers[0]]
                        break
                    } else {
                        resultadoFinal = eval(arrNumbers[0], arrNumbers[2], arrNumbers[1])
                        arrNumbers = [resultadoFinal]
                    }
                    result.innerText = resultadoFinal
                    console.log({arrNumbers})
                    isEqualActivated = true
                    break
                }
            default:
                break
        }
    } else if (arrNumbers.length === 6) {
        console.log('Tengo 6')
        const auxOperator = arrNumbers[arrNumbers.length - 3]
        switch (auxOperator) {
            case 'x':
                console.log(`I'm mul`)
                let auxMul = 0
                auxMul = arrNumbers[2] * arrNumbers[4]
                resultadoFinal = eval(arrNumbers[0], auxMul, arrNumbers[1])
                result.innerText = resultadoFinal
                // arrNumbers = [resultadoFinal, arrNumbers[1]]
                arrNumbers = [resultadoFinal]
                console.log({arrNumbers})
                break
            case '/':
                console.log(`I'm div`)
                let auxDiv = 0
                auxDiv = arrNumbers[2] / arrNumbers[4]
                resultadoFinal = eval(arrNumbers[0], auxDiv, arrNumbers[1])
                result.innerText = resultadoFinal
                // arrNumbers = [resultadoFinal, arrNumbers[1]]
                arrNumbers = [resultadoFinal]
                console.log({arrNumbers})
                break
        }
    }
    console.log(arrNumbers.length)
}

function eval(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2
        case '-':
            return num1 - num2
        case 'x':
            return num1 * num2
        case '/':
            return num1 / num2
        default:
            return `You can't divide by 0`
    } 
}

function clear() {
    auxNum = ''
    arrNumbers = []
    resultadoFinal = 0
    isEqualActivated = false
    result.innerText = resultadoFinal
    resultPreview.innerText = ''
}