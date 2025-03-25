export function setRemoveBorderColorOnEdit(input: HTMLInputElement) {
	input.addEventListener("input", () => {
		input.style.removeProperty("border-color");
	});
}

export function setBorderColor(input: HTMLInputElement, colorVar: string) {
	input.style.setProperty("border-color", `var(--${colorVar})`);
}
