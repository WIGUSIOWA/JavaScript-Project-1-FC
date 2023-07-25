"use strict";

import { addIncome } from "./incomes/actions.js";
import { addOutcome } from "./outcomes/actions.js";

//incomes - elements maped to JS:
export const incomeName = document.getElementById("income-name");
export const incomeValue = document.getElementById("income-value");
export const incomesList = document.getElementById("incomes-list");
export const incomesSum = document.getElementById("incomes-sum");
export const outcomesList = document.getElementById("outcomes-list");
export const outcomesSum = document.getElementById("outcomes-sum");
export const outcomeName = document.getElementById("outcome-name");
export const outcomeValue = document.getElementById("outcome-value");
const balanceInfoText = document.getElementById("total-balance");
const incomesForm = document.getElementById("incomes-form");
const outcomesForm = document.getElementById("outcomes-form");

//functions:

incomesForm.addEventListener("submit", addIncome);
outcomesForm.addEventListener("submit", addOutcome);

export const displayCurrentBalance = () => {
	const outcome = Number(outcomesSum.innerText);
	const income = Number(incomesSum.innerText);
	if (outcome > income) {
		balanceInfoText.innerText = `Wydałaś za dużo, jesteś na minusie o ${
			outcome - income
		}zł.`;
	} else if (income > outcome) {
		balanceInfoText.innerText = `Jesteś na plusie, możesz wydać jeszcze ${
			income - outcome
		} zł`;
	} else {
		balanceInfoText.innerText = `Bilans wynosi zero zł.`;
	}
};
