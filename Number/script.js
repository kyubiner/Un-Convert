import { unitConverter, unitConverterUI } from "../script/data.js";

const buttonConvert = document.getElementById("buttonConvert");
const typeConvert = document.getElementById("type-convert");
const outputResult = document.getElementById("output");
const Inputvalue = document.getElementById("input");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const outputExplain = document.getElementById("explain");

outputResult.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(outputResult.innerText);
});

const binery = new unitConverter({
    name: "binery",
    units: [
        { idBase: 2, label: "biner" },
        { idBase: 8, label: "octal" },
        { idBase: 10, label: "decimal" },
        { idBase: 16, label: "hexadecimal" },
        { label: "text" },
    ],

    explaination: function (from, to) {
        const fromUnit = this.units.find(u => u.label == from);
        const toUnit = this.units.find(u => u.label == to);
        if (fromUnit.label == toUnit.label) {
            return `Same type`;
        } else {
            return `${fromUnit.label} -> ${toUnit.label}`;
        }
    }
});

const data_decimal = new unitConverter({
    name: "data_decimal",
    units: [
        { id: 1, label: "bit", factor: 1 },
        { id: 2, label: "kilobit", factor: 1000 },
        { id: 3, label: "megabit", factor: 1000 ** 2 },
        { id: 4, label: "terabit", factor: 1000 ** 3 },
        { id: 5, label: "petabit", factor: 1000 ** 4 },
        { id: 6, label: "byte", factor: 8 },
        { id: 7, label: "kilobyte", factor: 8000 },
        { id: 8, label: "megabyte", factor: 8000 ** 2 },
        { id: 9, label: "terabyte", factor: 8000 ** 3 },
        { id: 10, label: "petabyte", factor: 8000 ** 4 },
    ],
    explaination: function (from, to, value) {
        const fromUnit = this.units.find(u => u.label == from);
        const toUnit = this.units.find(u => u.label == to);
        const operation = fromUnit.factor / toUnit.factor;
        if (fromUnit.id > toUnit.id) {
            return `${value} multiplied by ${operation}`;
        } else if (fromUnit.id < toUnit.id) {
            return `${value} divided by ${Math.ceil(1 / operation)}`;
        }
        return `${value} remains the same`;
    }
});

const data_binery = new unitConverter({
    name: "data_binery",
    units: [
        { id: 1, label: "bit", factor: 1 },
        { id: 2, label: "kilobit", factor: 1024 },
        { id: 3, label: "megabit", factor: 1024 ** 2 },
        { id: 4, label: "terabit", factor: 1024 ** 3 },
        { id: 5, label: "petabit", factor: 1024 ** 4 },
        { id: 6, label: "byte", factor: 8 },
        { id: 7, label: "kilobyte", factor: 8 * 1024 },
        { id: 8, label: "megabyte", factor: 8 * 1024 ** 2 },
        { id: 9, label: "terabyte", factor: 8 * 1024 ** 3 },
        { id: 10, label: "petabyte", factor: 8 * 1024 ** 4 },
    ],
    explaination: function (from, to, value) {
        const fromUnit = this.units.find(u => u.label == from);
        const toUnit = this.units.find(u => u.label == to);
        const operation = fromUnit.factor / toUnit.factor;
        if (fromUnit.id < toUnit.id) {
            return `${value} multiplied by ${operation}`;
        } else if (fromUnit.id > toUnit.id) {
            return `${value} divided by ${Math.ceil(1 / operation)}`;
        }
        return `${value} remains the same`;
    }
});

const converterProperty = {
    binery,
    data_decimal,
    data_binery,
}

const converterUi = new unitConverterUI(converterProperty);
let activeConverter = binery
outputExplain.classList.add("invicible");

typeConvert.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    activeConverter = converterProperty[selectedCategory];
    updateUnitOptions(selectedCategory);
    outputResult.innerHTML = "Result:";
    outputExplain.classList.add("invicible");
})

function updateUnitOptions(category) {
    fromUnit.innerHTML = converterUi.generateOption(category);
    toUnit.innerHTML = converterUi.generateOption(category);
};

const regex_biner= /^[01]+$/;
const regex = /^[0-9]+$/;
const regex_hex = /^[0-9a-zA-Z]+$/;

buttonConvert.addEventListener("click", (e) => {
    e.preventDefault();
    const value = Inputvalue.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    if (from === "biner" && !regex_biner.test(value)) {
        alert("value must 0 or 1!");
        return;
    }
    if(from !== "text" && from !== "hexadecimal" && !regex.test(value)) {
        alert("invalid value!");
        return;
    }
    if(from === "hexadecimal" && !regex_hex.test(value)) {
        alert("invalid value!");
        return;
    }
    const result = activeConverter.convert(value, from, to);
    outputExplain.classList.remove("invicible");
    outputExplain.innerHTML = activeConverter.explain(from, to, value);
    return (outputResult.innerHTML = `${result} 
    <button class="clipboard">
        <svg fill="#00ccff" width="20px" height="20px" viewBox="0 0 32.00 32.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="list-1" enable-background="new 0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="9" y="14" width="2" height="2"></rect> <rect x="13" y="18" width="10" height="2"></rect> <rect x="9" y="18" width="2" height="2"></rect> <rect x="13" y="22" width="10" height="2"></rect> <rect x="9" y="22" width="2" height="2"></rect> <rect x="13" y="14" width="10" height="2"></rect> <path d="M23 6V4h-6V2h-2v2H9v2H4v24h24V6H23zM11 6h10v2H11V6zM26 28H6V8h3v2h14V8h3V28z"></path> </g></svg>
    </button>`);
});