let bill = 0;
let tipPercentage = 0;
let numberOfPeople = 0;
let tipAmount = 0;
let total = 0;
const tipAmountDisplay = document.querySelector('#tip-amount');
const totalDisplay = document.querySelector('#total');
const errorDisplay = document.querySelector('#error');
// triggers
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipRadio = document.getElementsByName('tip-percent');
const customTipInput = document.getElementById('custom-tip')
const resetButton = document.getElementById('reset');




function calculate(){
    //get values
    bill = Number(document.getElementById('bill').value);
    numberOfPeople = Number(document.getElementById('people').value);
    tipPercentage = Number(document.getElementById('custom-tip').value); //get custom input
    
    //get checked radio button
    for (let i = 0; i < tipRadio.length; i++) {
        if(tipRadio[i].checked){
            tipPercentage = Number(tipRadio[i].value); 
        } 
    }

    //If all values are filled then calculate and show result on screen
    if (bill != 0 && numberOfPeople != 0 && tipPercentage != 0) {
        //calculate Tip and Total
        total = (bill / numberOfPeople) * ((tipPercentage + 100)/100);
        tipAmount = total - (bill / numberOfPeople);
        //Display Tip and Total
        tipAmountDisplay.textContent = Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tipAmount);
        totalDisplay.textContent = Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(total);
        
    }

}



// TRIGGERS
//Bill
billInput.addEventListener('input', function(){
    calculate();
});
//Number of people
peopleInput.addEventListener('input', function(){
    //validate input (Can't be zero)
    numberOfPeople = Number(document.getElementById('people').value);

    if(numberOfPeople === 0){
        errorDisplay.textContent = "Can't be zero";
        peopleInput.classList.add('input-error');
    } else {
        errorDisplay.textContent = "";
        peopleInput.classList.remove('input-error');
    }

    calculate();
});
//Radio Buttons
for (let i = 0; i < tipRadio.length; i++) {
    tipRadio[i].onclick = function(){
        customTipInput.value = ""; // Clear custom-tip input

        calculate();
    }
}
//Cistom Tip%
customTipInput.addEventListener('input', function(){
    for (let i = 0; i < tipRadio.length; i++) { 
        if(tipRadio[i].checked){
            tipRadio[i].checked = false; //Uncheck selected radio button
        } 
    }

    calculate();
});



//Reset Tip and Total Display
resetButton.onclick = function(){
    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
}