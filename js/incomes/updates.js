"use strict";
import { displayCurrentBalance, incomesList, incomesSum } from "../main.js";
import { incomes, deleteIncome, editIncomesList } from "./actions.js";

export const renderIncomesList = () => {
	incomesList.innerHTML = "";

	for (let income of incomes) {
		const listElement = document.createElement("li");
		listElement.classList.add("list-income-item");
		listElement.id = income.id;

		const listElementWrapper = document.createElement("div");
		listElementWrapper.classList.add("income-list-element-wrapper");

		const name = document.createElement("p");
		name.innerText = income.name;

		const value = document.createElement("p");
		value.innerText = income.value;

		const buttonsWrapper = document.createElement("div");
		buttonsWrapper.classList.add("buttons-wrapper");

		const editButton = document.createElement("button");
		editButton.id = income.id;
		editButton.innerText = "Edytuj";

		const removeButton = document.createElement("button");
		removeButton.id = income.id;
		removeButton.innerText = "Usuń";

		buttonsWrapper.appendChild(editButton);
		buttonsWrapper.appendChild(removeButton);
		incomesList.appendChild(listElement);

		listElementWrapper.appendChild(name);
		listElementWrapper.appendChild(value);
		listElementWrapper.appendChild(buttonsWrapper);

		listElement.appendChild(listElementWrapper);

		removeButton.addEventListener("click", deleteIncome);
		editButton.addEventListener("click", renderUpdateInputs);
	}

	calculateIncomesSum();
};

const calculateIncomesSum = () => {
	const _incomesSum = incomes.reduce((acc, income) => {
		return acc + income.value;
	}, 0);

	incomesSum.innerText = _incomesSum;
	displayCurrentBalance();
};

const renderUpdateInputs = (e) => {
	const id = e.target.id;
	const listElement = document.getElementById(id);

	const updateInputsWrapper = document.createElement("div");
	updateInputsWrapper.id = `update-${id}`;

	const nameInput = document.createElement("input");
	nameInput.id = `update-name-${id}`;

	const incomeInput = document.createElement("input");
	incomeInput.type = "number";
	incomeInput.id = `update-income-${id}`;

	const saveButton = document.createElement("button");
	saveButton.innerText = "SAVE";
	saveButton.id = `update-save-${id}`;

	const cancelButton = document.createElement("button");
	cancelButton.innerText = "CANCEL";
	cancelButton.id = `update-cancel-${id}`;

	updateInputsWrapper.appendChild(nameInput);
	updateInputsWrapper.appendChild(incomeInput);
	updateInputsWrapper.appendChild(saveButton);
	updateInputsWrapper.appendChild(cancelButton);

	listElement.appendChild(updateInputsWrapper);

	cancelButton.addEventListener("click", cancelEditInputs);
	saveButton.addEventListener("click", editIncomesList);
};

const cancelEditInputs = (e) => {
	e.preventDefault();

	const id = e.target.id.split("-")[2];
	const listElement = document.getElementById(id);
	const updateElement = document.getElementById(`update-${id}`);
	listElement.removeChild(updateElement);
};
