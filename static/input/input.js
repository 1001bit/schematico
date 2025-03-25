export function setRemoveBorderColorOnEdit(input) {
    input.addEventListener("input", () => {
        input.style.removeProperty("border-color");
    });
}
export function setBorderColor(input, colorVar) {
    input.style.setProperty("border-color", `var(--${colorVar})`);
}
