const $ = (selector) => document.querySelector(selector)

const result = $('#result')
const resultPreview = $('#result-preview')
/* Clear and Delete */
const buttonClear = $('.button-clear')
const buttonDelete = $('.button-delete')
/* ---- Numbers ----*/
const buttonDot = $('.num-dot').addEventListener('click', () => {calculate('.')})
const button0 = $('.num-0').addEventListener('click', () => {calculate('0')})
const button1 = $('.num-1').addEventListener('click', () => {calculate('1')})
const button2 = $('.num-2').addEventListener('click', () => {calculate('2')})
const button3 = $('.num-3').addEventListener('click', () => {calculate('3')})
const button4 = $('.num-4').addEventListener('click', () => {calculate('4')})
const button5 = $('.num-5').addEventListener('click', () => {calculate('5')})
const button6 = $('.num-6').addEventListener('click', () => {calculate('6')})
const button7 = $('.num-7').addEventListener('click', () => {calculate('7')})
const button8 = $('.num-8').addEventListener('click', () => {calculate('8')})
const button9 = $('.num-9').addEventListener('click', () => {calculate('9')})
/* ---- Operators ----*/
const buttonDiv = $('.div').addEventListener('click', () => {calculate('/')})
const buttonMul = $('.mul').addEventListener('click', () => {calculate('x')})
const buttonMinus = $('.minus').addEventListener('click', () => {calculate('-')})
const buttonSum = $('.sum').addEventListener('click', () => {calculate('+')})
const buttonEqual = $('.equal').addEventListener('click', () => {calculate('=')})

let aux = ''
let firstNumberAux = 0
let operatorAux = ''
let finalResult = 0
let isNextANumber = false
let wasAEqualBefore = false
let minusCounterAux = 0

function calculate(num) {
    const operatorsConditional = num === '/' || num === 'x' || num === '-' || num === '+' || num === '='
    if (operatorsConditional && isNextANumber === false) {
        if (wasAEqualBefore === true) resultPreview.innerText = finalResult
        if (num !== '=') operatorAux = num // -
        console.log({finalResult})
        resultPreview.innerText += aux + num
        switch (operatorAux) {
            case '-':
                console.log('Estoy restando')
                if (minusCounterAux === 0) {
                    aux === '' ? finalResult += 0 : finalResult += parseFloat(aux) // 10 + 0 = 10
                    minusCounterAux++ // 1
                    break
                }
                aux === '' ? finalResult += 0 : finalResult += -parseFloat(aux)
                console.log('Resta ' + finalResult)
                result.innerText = finalResult // 10
                minusCounterAux = 0
                break
            case '+':
                console.log('Estoy sumando')
                aux === '' ? finalResult += 0 : finalResult += parseFloat(aux) // 10 + 0 = 10
                console.log('Suma ' + finalResult)
                result.innerText = finalResult // 10
                break
        }
        aux = ''
        isNextANumber = true
        wasAEqualBefore = false
        if (num === '=') {
            isNextANumber = false
            wasAEqualBefore = true
        }
    } else if (!operatorsConditional) {
        if (aux.length === 0) {
            result.innerText = ''
        }
        if (wasAEqualBefore === true) {
            finalResult = 0
            wasAEqualBefore = false
            resultPreview.innerText = ''
        }
        aux += num // 10
        result.innerText += num // 10
        isNextANumber = false
    }
}