"use strict";

import { addIncome } from "./incomes/actions.js";

//incomes - zmapowane elementy do pliku JS:
export const incomeName = document.getElementById("income-name");
export const incomeValue = document.getElementById("income-value");
export const incomesList = document.getElementById("incomes-list");
export const incomesSum=document.getElementById('incomes-sum');
const addIncomeButton = document.getElementById("add-income-button");

//funkcje:

addIncomeButton.addEventListener("click", addIncome);
