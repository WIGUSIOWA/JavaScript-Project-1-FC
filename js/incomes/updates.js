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
		listElementWrapper.classList.add("list-element-wrapper");

		const name = document.createElement("p");
		name.innerText = income.name;
		name.id = `income-name-${listElement.id}`;
		name.classList.add("income-name");

		const value = document.createElement("p");
		value.innerText = income.value;
		value.id = `income-value-${listElement.id}`;

		const buttonsWrapper = document.createElement("div");
		buttonsWrapper.classList.add("buttons-wrapper");

		const editButton = document.createElement("button");
		editButton.id = income.id;
		editButton.innerText = "Edytuj";
		editButton.classList.add("edit-button");

		const removeButton = document.createElement("button");
		removeButton.id = income.id;
		removeButton.innerText = "Usuń";
		removeButton.classList.add("remove-button");

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
	const inputsExist = document.getElementById(`update-${id}`);
	if (!inputsExist) {
		const updateInputsWrapper = document.createElement("form");
		updateInputsWrapper.id = `update-${id}`;

		const nameInput = document.createElement("input");
		nameInput.id = `update-name-${id}`;
		nameInput.value = document.getElementById(`income-name-${id}`).textContent;
		nameInput.required = true;

		const incomeInput = document.createElement("input");
		incomeInput.type = "number";
		incomeInput.id = `update-income-${id}`;
		incomeInput.value = document.getElementById(
			`income-value-${id}`
		).textContent;
		incomeInput.required = true;
		incomeInput.min = "0.01";
		incomeInput.step = "0.01";

		const saveButton = document.createElement("button");
		saveButton.innerText = "SAVE";
		saveButton.classList.add("save-button");
		saveButton.id = `update-save-${id}`;
		saveButton.type = "submit";

		const cancelButton = document.createElement("button");
		cancelButton.innerText = "CANCEL";
		cancelButton.id = `update-cancel-${id}`;
		cancelButton.type = "button";

		updateInputsWrapper.appendChild(nameInput);
		updateInputsWrapper.appendChild(incomeInput);
		updateInputsWrapper.appendChild(saveButton);
		updateInputsWrapper.appendChild(cancelButton);

		listElement.appendChild(updateInputsWrapper);

		cancelButton.addEventListener("click", cancelEditInputs);
		saveButton.addEventListener("click", editIncomesList);
		updateInputsWrapper.addEventListener("submit", editIncomesList);

		updateInputsWrapper.addEventListener("submit", (e) => {
			e.preventDefault();

			const newName = nameInput.value.trim();
			const newIncomeValue = parseFloat(incomeInput.value);

			if (!newName || newIncomeValue <= 0) {
				alert("Proszę podać prawidłową nazwę i wartość dodatniego przychodu.");
				return;
			}

			editIncomesList(id, newName, newIncomeValue);

			listElement.removeChild(updateInputsWrapper);
		});
	}
};

const cancelEditInputs = (e) => {
	e.preventDefault();

	const id = e.target.id.split("-")[2];
	const listElement = document.getElementById(id);
	const updateElement = document.getElementById(`update-${id}`);
	listElement.removeChild(updateElement);
}
