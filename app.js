const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
// let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');


const compute = (a, oparator, b) => {
            let computation
            const current = parseFloat(a);
            const previous = parseFloat(b);
            if(isNaN(previous) || isNaN(current)) return
            switch (oparator) {
                case '+':
                    computation = previous + current
                    break
                case '-':
                    computation = current - previous 
                    break
    
                case '*':
                    computation = previous * current
                    break
    
                case '÷':
                    computation = current / previous
                    break
                default:
                    return
            };
            return computation
    
        };

//applying for each number's button
numberButtons.forEach((button) => {
    // add event listener to number's keys
    button.addEventListener('click', () => {

        if(currentOperandTextElement.innerText ==="0") {

            currentOperandTextElement.innerText = button.innerText;
        }

        else{
            currentOperandTextElement.innerText += button.innerText;
        } 

    });
    
});

// add event listener to clear all(CA) keys
allClearButton.addEventListener('click', button => {
    currentOperandTextElement.innerText="0"
    console.log(currentOperandTextElement.innerText)
});

 // add event listener to delete keys
 deleteButton.addEventListener('click', () => {
     const dataToDelete = currentOperandTextElement.innerText;
     const removeLastElement = dataToDelete.split("").slice(0, -1).join("");
     currentOperandTextElement.innerText= removeLastElement === ""? "0":removeLastElement;
});

// add event listener to equals' keys
equalsButton.addEventListener('click',  button => {
    let currentValue = currentOperandTextElement.innerText

    const firstNum = currentValue.split(" ")[0];
    const secondNumArr = currentValue.split(" ")[1]
    const oparator = secondNumArr.split("").shift()
    const reversedArr = secondNumArr.split("").reverse().slice(0, -1)
    const secondNum = reversedArr.reverse().join("")
    
    const results = compute(firstNum,oparator, secondNum);
    currentOperandTextElement.innerText = results
});

operationButtons.forEach((opButton)=> {
    // add event listener to operator's keys
    opButton.addEventListener('click', () => {
    let currentValue = currentOperandTextElement.innerText;
    const space = " "

    if(currentValue ==="0") return

    // check if current inputs contains an oparator
    if(checkOparatorExist(currentValue)) return

    if(!checkOparatorExist(currentValue.split("").reverse()[0])){
        const spacedOp = opButton.innerText
        currentOperandTextElement.innerText +=  space + spacedOp + space;
    }
});
})

// checking existing oparators
const checkOparatorExist = (op) => {
    const arrayOparations = ["+","*","/","-"] 
    return arrayOparations.includes(op)
}