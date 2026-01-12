import { unitConverter, unitConverterUI } from "../script/data.js";

const buttonConvert = document.getElementById("buttonConvert");
const typeConvert = document.getElementById("type-convert");
const outputResult = document.getElementById("output");
const Inputvalue = document.getElementById("input");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const outputExplain = document.getElementById("explain");

const length = new unitConverter({
    name: "length",
    units: [
        { id: 1, label: "kilometer", factor: 1000 },
        { id: 2, label: "hektometer", factor: 100 },
        { id: 3, label: "dekameter", factor: 10 },
        { id: 4, label: "meter", factor: 1 },
        { id: 5, label: "desimeter", factor: 0.1 },
        { id: 6, label: "centimeter", factor: 0.01 },
        { id: 7, label: "milimeter", factor: 0.001 },
    ],
    explaination: function (from, to, value) {
        const fromUnit = this.units.find(u => u.label == from); 
        const toUnit = this.units.find(u => u.label == to);
        const operation = fromUnit.factor / toUnit.factor;
        if(fromUnit.id < toUnit.id) {
            return `${value} multiplied by ${operation}`;
        }else if(fromUnit.id > toUnit.id){
            return `${value} divided by ${Math.ceil(1 / operation)}`;
        }
        return `${value} remains the same`;
    }
});

const mass = new unitConverter({
    name: "mass",
    units: [
        { id: 1, label: "kilogram", factor: 1000 },
        { id: 2, label: "hektogram", factor: 100 },
        { id: 3, label: "dekagram", factor: 10 },
        { id: 4, label: "meter", factor: 1 },
        { id: 5, label: "desigram", factor: 0.1 },
        { id: 6, label: "centigram", factor: 0.01 },
        { id: 7, label: "miligram", factor: 0.001 },
    ],
    explaination: function (from, to, value) {
        const fromUnit = this.units.find(u => u.label == from); 
        const toUnit = this.units.find(u => u.label == to);
        const operation = fromUnit.factor / toUnit.factor;
        if(fromUnit.id < toUnit.id) {
            return `${value} multiplied by ${operation}`;
        }else if(fromUnit.id > toUnit.id){
            return `${value} divided by ${Math.ceil(1 / operation)}`;
        }
        return `${value} remains the same`;
    }
});

const time = new unitConverter({
    name: "time",
    units: [
        { id: 1, label: "hour", factor: 3600 },
        { id: 2, label: "minute", factor: 60 },
        { id: 3, label: "second", factor: 1 },
    ],
    explaination: function (from, to, value) {
        const fromUnit = this.units.find(u => u.label == from); 
        const toUnit = this.units.find(u => u.label == to);
        const operation = fromUnit.factor / toUnit.factor;
        if(fromUnit.id < toUnit.id) {
            return `${value} multiplied by ${operation}`;
        }else if(fromUnit.id > toUnit.id){
            return `${value} divided by ${Math.ceil(1 / operation)}`;
        }
        return `${value} remains the same`;
    }
});

const temperature = new unitConverter({
    name: "temperature",
    units: [
        {
            label: "Fahrenheit",
            fromBase: v => (v - 32) * 5 / 9,
            toBase: v => (v * 9 / 5) + 32,
            fromBaseExplain: "x * 9 / 5 + 32",
            toBaseExplain: "(x - 32) * 5 / 9",
        },
        {
            label: "Kelvin",
            fromBase: v => v - 273.15,
            toBase: v => v + 273.15,
            fromBaseExplain: "- 273.15°K",
            toBaseExplain: "273.15°K",
        },
        {
            label: "Celcius",
            fromBase: v => v,
            toBase: v => v,
            fromBaseExplain: `1°C`,
            toBaseExplain: `1°C`,
        },
    ],
    explaination: function (from, to, value) {
        const fromUnit = this.units.find(u => u.label == from); 
        const toUnit = this.units.find(u => u.label == to);
        if(fromUnit.label == toUnit.label){
            return `Same type`;
        }else if(fromUnit.label == "Fahrenheit") {
            return `(${toUnit.toBaseExplain} - 32) * 5 / 9`;
        }else if(toUnit.label == "Fahrenheit") {
            return `(${fromUnit.fromBaseExplain} * 9 / 5) + 32`;
        }else {
            return `${fromUnit.fromBaseExplain} + ${toUnit.toBaseExplain}`;
        }
    } 
});

const converterProperty = {
    length,
    mass,
    time,
    temperature,
}

const converterUi = new unitConverterUI(converterProperty);
let activeConverter = length
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

buttonConvert.addEventListener("click", (e) => {
    e.preventDefault();
    const value = Number(Inputvalue.value);
    const from = fromUnit.value;
    const to = toUnit.value;
    const result = activeConverter.convert(value, from, to);
    outputExplain.classList.remove("invicible");
    outputExplain.innerHTML = activeConverter.explain(from, to, value);
    if (result > 100000) {
        return outputResult.innerHTML = 
        `Result: ${result.toLocaleString("en-US", {notation: "scientific", maximumFractionDigits: 2})} ${to}`;
    } else if(result < 0) {
        `Result: ${result.toLocaleString("en-US", {notation: "standard"})} ${to}`;
    }
    return (outputResult.innerHTML = `Result: ${result.toLocaleString("en-US", {notation: "standard"})} ${to}`);
})

const bubble = document.querySelector(".chat-bubble");
const maskot = document.querySelector(".assistant-img");
const textBubble = [
    "Hello need help converting?👾",
    "Enter the number & select the unit. then click Convert!",
    "[SYSTEM ONLINE] Data conversion ready!✅",
    "Want to know more? Check out the <span>Help page!</span>",
    "⚙️ Processing... conversions in seconds!",
    "Unit conversion with explanation of the formula in it!🚀",
]

let hideTimeout;
let lastTextIndex = -1;

maskot.addEventListener("click", () => {
    bubble.classList.remove("show");

    setTimeout(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * textBubble.length);
        } while (newIndex === lastTextIndex);
        lastTextIndex = newIndex;
        bubble.innerHTML = textBubble[newIndex];

        if (bubble.textContent.includes("Help page!")) {
            bubble.addEventListener("click", () => {
                window.location.href = "../help/index.html";
            });
        }

        bubble.classList.add("show");
        clearTimeout(hideTimeout);

        hideTimeout = setTimeout(() => {
            bubble.classList.remove("show");
        }, 5000);
    }, 300);
});