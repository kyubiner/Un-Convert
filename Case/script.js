const input = document.getElementById("input");
const output = document.getElementById("output");
const typeConvert = document.getElementById("type_convert");
const buttonConvert = document.getElementById("buttonConvert");

input.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

buttonConvert.addEventListener("click", (e) => {
    e.preventDefault();
    output.innerHTML = `${convertCase(typeConvert.value, input.value)} 
    <button class="clipboard">
        <svg fill="#00ccff" width="20px" height="20px" viewBox="0 0 32.00 32.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="list-1" enable-background="new 0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="9" y="14" width="2" height="2"></rect> <rect x="13" y="18" width="10" height="2"></rect> <rect x="9" y="18" width="2" height="2"></rect> <rect x="13" y="22" width="10" height="2"></rect> <rect x="9" y="22" width="2" height="2"></rect> <rect x="13" y="14" width="10" height="2"></rect> <path d="M23 6V4h-6V2h-2v2H9v2H4v24h24V6H23zM11 6h10v2H11V6zM26 28H6V8h3v2h14V8h3V28z"></path> </g></svg>
    </button>`;
});

output.addEventListener("click", () => {
    navigator.clipboard.writeText(output.innerHTML)
});

function convertCase(type, text) {
    switch (type) {
        case "sentence":
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

        case "lower":
            return text.toLowerCase();

        case "upper":
            return text.toUpperCase();

        case "capitalized":
            return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        
        case "camel":
            return text.toLowerCase().split(/\s+/).map((word, index) =>
                index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            ).join("");

        case "snake":
            return text.toLowerCase().replace(/\s+/g, "_");

        case "kebab":
            return text.toLowerCase().replace(/\s+/g, "-");

        default:
            return text;
    }
}