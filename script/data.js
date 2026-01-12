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
        }

        const base = fromUnit.fromBase(value);
        return toUnit.toBase(base);
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