

document.addEventListener("DOMContentLoaded", function () {

    console.log("Starting");

    let form = document.querySelector("form");

    let variableCashInflowCheckbox = document.querySelector("#checkbox");

    let years = document.querySelector("#years");
    let discountRate = document.querySelector("#discountRate");

    let initialInvestment = document.querySelector("#initialInvestment");
    let selectedCurrency = document.querySelector("select");


    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let cashInflows = [];

        if (variableCashInflowCheckbox.checked) {

            for (let i = 0; i < years.value; i++) {
                let currentCashInput = document.querySelector(`#cashinput${i}`);
                cashInflows.push(currentCashInput.value);
            }

        } else {

            for (let i = 0; i < years.value; i++) {
                let currentCashInput = document.querySelector('#cashinput1');
                console.log(currentCashInput);
                cashInflows.push(currentCashInput.value);
            }

            console.log(cashInflows);
        }

        let NPV = calculateNPV(initialInvestment.value, years.value, discountRate.value, cashInflows);

        let tempNPV = NPV;

        let IRR = calculateIRR(tempNPV, initialInvestment.value, years.value, discountRate.value, cashInflows);

        alert(`The calculated Net Present Value is: ${NPV}  ${selectedCurrency.value}, and the Internal Rate of Return is: ${IRR} %`);

        return;
    })

    variableCashInflowCheckbox.addEventListener("change", function () {

        let label = document.querySelector("#cashInflowsInput");

        if (variableCashInflowCheckbox.checked) {

            let html = '<p>Yearly Cash inflow ($) </p>';


            for (let i = 0; i < years.value; i++) {

                html = html + `<input placeholder="Year ${i + 1}'s amount" id = cashinput${i} required type="number">`

            }

            label.innerHTML = html;

        } else {

            label.innerHTML = '<p>Yearly Cash inflow ($) </p> <input placeholder = "Amount" id=cashinput1 required type="number"> ';

        }

    })



});

function calculateNPV(initialInvestment, years, discountRate, cashInflows) {

    let NPV = initialInvestment * -1;

    console.log("Initialized NPV");
    console.log(NPV);


    for (let i = 0; i < years; i++) {

        let periodPV = cashInflows[i] * (1 / (1 + discountRate * 0.01) ** (i + 1));

        NPV += periodPV;
        console.log("Period Added");
        console.log(periodPV);
        console.log("Current NPV");
        console.log(NPV);
    }

    console.log(NPV);

    return NPV.toFixed(2);

}

function calculateIRR(NPV, initialInvestment, years, discountRate, cashInflows) {



    while (Math.abs(NPV) > initialInvestment * 0.001) {

        console.log("Current IRR NPV");
        console.log(NPV);
        console.log("Current IRR discount rate try");
        console.log(discountRate);


        if (NPV > 0) {

            discountRate = Number(discountRate) + 0.1;

            NPV = calculateNPV(initialInvestment, years, discountRate, cashInflows);

            console.log("Calculating irr with");
            console.log(NPV);
            console.log(discountRate);


        } else if (NPV < 0) {

            console.log("Discount rate was lower, new IRR try");

            discountRate = Number(discountRate) - 0.1;

            console.log("New discount rate try");
            console.log(discountRate);

            NPV = calculateNPV(initialInvestment, years, discountRate, cashInflows);

            console.log("Calculating irr with");
            console.log(NPV);
            console.log(discountRate);

        }
    }

    return discountRate.toFixed(1);
}