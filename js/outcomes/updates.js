"use strict";
import { displayCurrentBalance, outcomesList, outcomesSum } from "../main.js";
import { outcomes, deleteOutcome, editOutcomesList } from "./actions.js";

export const renderOutcomesList = () => {
	outcomesList.innerHTML = "";

	for (let outcome of outcomes) {
		const listElement = document.createElement("li");
		listElement.classList.add("list-outcome-item");
		listElement.id = outcome.id;

		const listElementWrapper = document.createElement("div");
		listElementWrapper.classList.add("list-element-wrapper");

		const name = document.createElement("p");
		name.innerText = outcome.name;
		name.id = `outcome-name-${listElement.id}`;
		name.classList.add("outcome-name");

		const value = document.createElement("p");
		value.innerText = outcome.value;
		value.id = `outcome-value-${listElement.id}`;

		const buttonsWrapper = document.createElement("div");
		buttonsWrapper.classList.add("buttons-wrapper");

		const editButton = document.createElement("button");
		editButton.id = outcome.id;
		editButton.innerText = "Edytuj";
		editButton.classList.add("edit-button");

		const removeButton = document.createElement("button");
		removeButton.id = outcome.id;
		removeButton.innerText = "Usuń";
		removeButton.classList.add("remove-button");

		buttonsWrapper.appendChild(editButton);
		buttonsWrapper.appendChild(removeButton);
		outcomesList.appendChild(listElement);

		listElementWrapper.appendChild(name);
		listElementWrapper.appendChild(value);
		listElementWrapper.appendChild(buttonsWrapper);

		listElement.appendChild(listElementWrapper);

		removeButton.addEventListener("click", deleteOutcome);
		editButton.addEventListener("click", renderUpdateInputs);
	}

	calculateOutcomesSum();
};

const calculateOutcomesSum = () => {
	const _outcomesSum = outcomes.reduce((acc, outcome) => {
		return acc + outcome.value;
	}, 0);

	outcomesSum.innerText = _outcomesSum;
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
		nameInput.value = document.getElementById(`outcome-name-${id}`).textContent;
		nameInput.required = true;

		const outcomeInput = document.createElement("input");
		outcomeInput.type = "number";
		outcomeInput.id = `update-outcome-${id}`;
		outcomeInput.value = document.getElementById(
			`outcome-value-${id}`
		).textContent;
		outcomeInput.required = true;
		outcomeInput.min = "0.01";
		outcomeInput.step = "0.01";

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
		updateInputsWrapper.appendChild(outcomeInput);
		updateInputsWrapper.appendChild(saveButton);
		updateInputsWrapper.appendChild(cancelButton);

		listElement.appendChild(updateInputsWrapper);

		cancelButton.addEventListener("click", cancelEditInputs);
		saveButton.addEventListener("click", editOutcomesList);
		updateInputsWrapper.addEventListener("submit", editOutcomesList);

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
};
