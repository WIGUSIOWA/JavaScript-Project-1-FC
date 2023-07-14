"use strict";
import { incomeName, incomeValue } from "../main.js";
import { renderIncomesList } from "./updates.js";

export let incomes = [];

export const addIncome = (e) => {
	e.preventDefault();

	const income = {
		name: incomeName.value,
		value: Number(incomeValue.value).toFixed(2),
		id: Math.random().toString(),
	};

	incomes.push(income);

	renderIncomesList();

	incomeName.value = "";
	incomeValue.value = "";
};

export const deleteIncome = (e) => {
	e.preventDefault();
	const idToDelete = e.target.id;
	incomes = incomes.filter((el) => el.id !== idToDelete);

	renderIncomesList();
};

export const editIncomesList = (e) => {
	e.preventDefault();

	const idToEdit = e.target.id.split("-")[2];
	const nameValue = document.getElementById(`update-name-${idToEdit}`).value;
	const incomeValue = document.getElementById(
		`update-income-${idToEdit}`
	).value;

	if (nameValue && incomeValue) {
		const inputsExist = document.getElementById(`update-inputs-${idToEdit}`);
		if (!inputsExist) {
			const inputsContainer = document.createElement("div");
			inputsContainer.id = `update-inputs-${idToEdit}`;
			inputsContainer.innerHTML = `
				<input type="text" id="update-name-${idToEdit}" value="${nameValue}">
				<input type="number" id="update-income-${idToEdit}" value="${incomeValue}">
			`;

			document
				.getElementById(`income-item-${idToEdit}`)
				.appendChild(inputsContainer);
		}
		incomes = incomes.map((income) => {
			if (income.id === idToEdit) {
				return {
					...income,
					name: nameValue,
					value: Number(incomeValue).toFixed(2),
				};
			}
			return income;
		});

		renderIncomesList();
	}
};
