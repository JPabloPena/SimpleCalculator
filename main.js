const $ = (selector) => document.querySelector(selector)

const result = $('#result')
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
const buttonMul = $('.mul').addEventListener('click', () => {calculate('*')})
const buttonMinus = $('.minus').addEventListener('click', () => {calculate('-')})
const buttonSum = $('.sum').addEventListener('click', () => {calculate('+')})
const buttonEqual = $('.equal').addEventListener('click', () => {calculate('=')})

let aux = ''
function calculate(num) {
    let finalResult
    if (num === '/' || num === '*' || num === '-' || num === '+') {
        
    }
    switch (num) {
        case '/':

        case '*':

        case '-':
            parseFloat(aux)
        case '+':

        default:
            aux += num

    }
    result.innerText += num
}