export class unitConverter {
    constructor({ name, units, explaination }) {
        this.name = name;
        this.units = units;
        this.explaination = explaination;
    }

    convert(value, from, to) {
        const fromUnit = this.units.find(e => e.label === from);
        const toUnit = this.units.find(e => e.label === to);

        if (fromUnit.factor) {
            const base = value * fromUnit.factor;
            return base / toUnit.factor;
        } if (fromUnit.base) {
            const base = fromUnit.fromBase(value);
            return toUnit.toBase(base);
        }

        if (from === "text") {
            return value.split("").map(c => c.charCodeAt(0).toString(toUnit.idBase)).join(" ");
        }

        if (to === "text") {
            return value.split(" ").map(c => String.fromCharCode(parseInt(c, fromUnit.idBase))).join("");
        }

        const base10 = parseInt(value, fromUnit.idBase);
        return base10.toString(toUnit.idBase);
    }

    explain(from, to, value) {
        return this.explaination(from, to, value)
    }
}

export class unitConverterUI {
    constructor(data) {
        this.data = data;
    };

    getUnits(category) {
        return this.data[category];
    }

    generateOption(category) {
        const elementCategory = this.getUnits(category);
        const selectedCategory = elementCategory.units;
        return selectedCategory.map(
            (unit) => {
            return `
            <option 
            value="${unit.label}"
            >
            ${unit.label}
            </option>
            `
        }
    ).join(" ");
    };
};