window.addEventListener("load", function() {
    
    const links = document.querySelectorAll("link");
    const prevOperandText = document.querySelector(".data-previous-operand");
    const currentOperandText = document.querySelector(".data-current-operand");
    const deleteBtn = document.querySelector("[data-delete]");
    const resultBtn = document.querySelector("[data-output]");
    const resetBtn = document.querySelector("[data-reset]");
    const operands = document.querySelectorAll("[data-num]");
    const operatorBtn = document.querySelectorAll("[data-operator]");
    let prevOperand = prevOperandText.innerText;
    let currentOperand = currentOperandText.innerText;
    let operation;


    function reset() { //funcao que redefine apos o usuario clicar em "limpar"
        prevOperand = "";    
        currentOperand = "";
        operation = undefined;
    }

    function deleteOperand() { //exclui o ultimo caracter digitado 
        currentOperand = currentOperand.toString().slice(0, -1);
    }

    function addNumber(number) { //usada para add um numero ou ponto a variavel currentOperand
        if(number === "." && currentOperand.includes(".")) return;
        currentOperand = currentOperand.toString() + number.toString();
    }

    function operationSelection(operate) { // representa a operacao que sera selecionada
        if(currentOperandText === "") return; // se for uma string vazia, retorna impedindo que a operacao seja selecionada antes que o operando atual seja inserido
        if(prevOperandText !== "") { //executa o calculo caso nao seja uma string vazia
            calculatorOperation();
        }
        operation = operate;
        prevOperand = currentOperand;
        currentOperand = "";
    }


    function calculatorOperation(){
        let result;
        let prev = parseFloat(prevOperand); //converte uma string em float
        let current = parseFloat(currentOperand);
        if(isNaN(prev) || isNaN(current)) return; //verifica se sao valores validos
        
        switch(operation){
            case "+":
                result = prev + current;
                break;
            
            case "-":
                result = prev - current;
                break;

            case "*":
                result = prev * current;
                break;

            case "/":
                result = prev / current;
                break;

            default:
                return;
        }
        //preparando a calc para a prox operacao
        currentOperand = result;
        operation = undefined;
        prevOperand = "";
        prevOperandText.innerText = "";
    }   

    function displayNum() {
        currentOperandText.innerText = currentOperand.toLocaleString("en");
        if(operation !== undefined) {
            prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
        } else {
            prevOperandText.innerText = prevOperand;
        }
    }   

    resetBtn.addEventListener("click", () => {
        reset(); //redefine os valores dos operandos e operadores
        displayNum(); //atualiza a exibicao na tela
    });

    deleteBtn.addEventListener("click",() => {
        deleteOperand();
        displayNum();
    });

    //add a funcionalidade de add numeros a calculadora
    operands.forEach(operand => {
        operand.addEventListener("click", () => {
            addNumber(operand.innerText);
            displayNum();
        });
    });

    operatorBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            operationSelection(btn.innerText);
            displayNum();        
        });
    });

    resultBtn.addEventListener("click", () => {
        calculatorOperation();
        displayNum();
    });

});
