class Calculator {
    constructor(previousoperandTextElement, currentoperandTextElement) {
        this.previousoperandTextElement = previousoperandTextElement
        this.currentoperandTextElement = currentoperandTextElement 
        this.clear()
    } 

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() { 
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return 
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand 
        this.currentOperand = '' 
    }

    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return 
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    
    getDisplayNumber(number) {
        if (number === null || number === undefined || number === '') return ''
    
        const stringNumber = number.toString()
        const [integerPart, decimalPart] = stringNumber.split('.')
    
        const integerDisplay = isNaN(parseFloat(integerPart))
            ? ''
            : parseFloat(integerPart).toLocaleString('en', {
                maximumFractionDigits: 0,
            })
    
        if (decimalPart != null && decimalPart !== '') {
            return `${integerDisplay}.${decimalPart}`
        } else {
            return integerDisplay
        }
    }
    
    

    updateDisplay() { 
        this.currentoperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousoperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        } else {
            this.previousoperandTextElement.innerText = ''
        }
    }
}


// ==== DOM SELECTORS ====

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousoperandTextElement  = document.querySelector('[data-previous-operand]')
const currentoperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousoperandTextElement, currentoperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
