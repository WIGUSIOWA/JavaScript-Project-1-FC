"use strict";
import { outcomeName, outcomeValue } from "../main.js";
import { renderOutcomesList } from "./updates.js";

export let outcomes = [];

export const addOutcome = (e) => {
	e.preventDefault();

	const _outcome = {
		name: outcomeName.value,
		value: Number(Number(outcomeValue.value).toFixed(2)),
		id: Math.random().toString(),
	};

	outcomes.push(_outcome);

	renderOutcomesList();

	outcomeName.value = "";
	outcomeValue.value = "";
};

export const deleteOutcome = (e) => {
	e.preventDefault();
	const idToDelete = e.target.id;
	outcomes = outcomes.filter((el) => el.id !== idToDelete);

	renderOutcomesList();
};

export const editOutcomesList = (e) => {
	e.preventDefault();

	const idToEdit = e.target.id.split("-")[2];
	const nameValue = document.getElementById(`update-name-${idToEdit}`).value;
	const outcomeValue = document.getElementById(
		`update-outcome-${idToEdit}`
	).value;

	if (nameValue && parseFloat(outcomeValue) > 0) {
		outcomes = outcomes.map((outcome) => {
			if (outcome.id === idToEdit) {
				return {
					...outcome,
					name: nameValue,
					value: Number(Number(outcomeValue).toFixed(2)),
				};
			}
			return outcome;
		});
		renderOutcomesList();
	}
};
