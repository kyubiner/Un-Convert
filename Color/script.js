const buttonConvert = document.getElementById("buttonConvert");
const outputResult = document.getElementById("output");
const Inputvalue = document.getElementById("input");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const rgbInput = document.getElementById("rgb-input");
const form = document.getElementById("Converter");

function convert(value, from, to) {
    let rgb;

    if (from === "hex") {
        let hex = value.hex.replace("#", "");

        if (hex.length === 3) {
            hex = hex.split("").map(v => v + v).join("");
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        rgb = { r, g, b };
    } else if (from === "rgb") {
        rgb = {
            r: value.r,
            g: value.g,
            b: value.b
        };
    } else if (from === "hsl") {
        let h = value.r;
        let s = value.g;
        let l = value.b;
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h < 120) {
            r = x; g = c; b = 0;
        } else if (h < 180) {
            r = 0; g = c; b = x;
        } else if (h < 240) {
            r = 0; g = x; b = c;
        } else if (h < 300) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }

        rgb = {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
    } else if (from === "hsv") {
        let h = value.r;
        let s = value.g;
        let v = value.b;
        s /= 100;
        v /= 100;

        const c = v * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = v - c;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h < 120) {
            r = x; g = c; b = 0;
        } else if (h < 180) {
            r = 0; g = c; b = x;
        } else if (h < 240) {
            r = 0; g = x; b = c;
        } else if (h < 300) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }

        rgb = {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
    }

    if (!rgb) return "error";

    if (to === "hex") {
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    } else if (to === "rgb") {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (to === "hsl") {
        return rgbToHsl(rgb.r, rgb.g, rgb.b);
    } else if (to === "hsv") {
        return rgbToHsv(rgb.r, rgb.g, rgb.b);
    }

    return "unsupported";
}

function rgbToHex(r, g, b) {
    return "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0");
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0, s = 0, l = (max + min) / 2;

    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta) % 6;
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }
        h *= 60;
        if (h < 0) h += 360;
    }

    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));
    }

    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}, ${l})`
};

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0, s = 0, v = max;

    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta) % 6;
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }
        h *= 60;
        if (h < 0) h += 360;
    }

    if (max !== 0) {
        s = delta / max;
    }

    h = Math.round(h);
    s = Math.round(s * 100);
    v = Math.round(v * 100);

    return `hsv(${h}, ${s}, ${v})`
};

fromUnit.addEventListener("change", (e) => {
    e.preventDefault();
    if (fromUnit.value != "hex") {
        rgbInput.classList.remove('invicible');
        rgbInput.classList.add('input_flex');
        Inputvalue.classList.add('invicible');
    } else {
        rgbInput.classList.remove('input_flex');
        rgbInput.classList.add('invicible');
        Inputvalue.classList.remove('invicible');
    }
})

outputResult.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(outputResult.innerText);
});

buttonConvert.addEventListener("click", (e) => {
    e.preventDefault();
    const input = Inputvalue.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const inputR = Number(document.getElementById("input1").value);
    const inputB = Number(document.getElementById("input3").value);
    const inputG = Number(document.getElementById("input2").value);
    const value = {
        hex: input,
        r: inputR,
        g: inputG,
        b: inputB
    };
    const result = convert(value, from, to);
    
    return (outputResult.innerHTML = `${result}
    <button class="clipboard">
        <svg fill="#00ccff" width="20px" height="20px" viewBox="0 0 32.00 32.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="list-1" enable-background="new 0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="9" y="14" width="2" height="2"></rect> <rect x="13" y="18" width="10" height="2"></rect> <rect x="9" y="18" width="2" height="2"></rect> <rect x="13" y="22" width="10" height="2"></rect> <rect x="9" y="22" width="2" height="2"></rect> <rect x="13" y="14" width="10" height="2"></rect> <path d="M23 6V4h-6V2h-2v2H9v2H4v24h24V6H23zM11 6h10v2H11V6zM26 28H6V8h3v2h14V8h3V28z"></path> </g></svg>
    </button>`);
});