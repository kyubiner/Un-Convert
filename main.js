const buttons = document.getElementsByTagName("button")

for (const button of buttons) {
    button.addEventListener("click", (e) => {
        const link = e.target.dataset.linked;
        window.location.href = `${link}`;
    })
}

const buttonContainers = document.querySelectorAll(".button-container");

const containers = document.querySelectorAll(".container");

containers.forEach(option => {
    console.log(option.children[1])
    const buttonContainer = option.children[0].children[0];
    const textContainer = option.children[1];
    buttonContainer.addEventListener("mouseenter", () => {
        textContainer.style.opacity = "0";
        textContainer.style.transform = "translateY(-10px)";
    })
    buttonContainer.addEventListener("mouseleave", () => {
        textContainer.style.opacity = "1";
        textContainer.style.transform = "translateY(0)";
    })
})

const faqs = document.querySelectorAll(".Faq");

faqs.forEach((faq) => {
    const question = faq.querySelector(".question");
    const answer = faq.querySelector(".answer");
    const icon = faq.querySelector(".ph-arrow-fat-line-down"); // Pastikan mengambil ikon panah di dalam FAQ

    question.addEventListener("click", () => {
        answer.classList.toggle("show");

        if (icon) {
            icon.classList.toggle("rotate");
        }
    });
});

const statusMsg = document.getElementById("status-msg");
const scriptURL = 'https://script.google.com/macros/s/AKfycbzC1ALxwxtLDOhNxdzt-IFg0Bz_we-g9Qf6ETi6_jMH_tvKVVE52OGDkI5cnZkPH8ui/exec'
const form = document.forms['Contact-form'];
const buttonSubmit = document.getElementById("button-submit");

function validateUserName(username) {
    const userNameRegex = /^[a-zA-Z0-9]{3,}$/;
    return userNameRegex.test(username);
} 
function validateEmail(email) {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
} 

function validateForm() {
    let username = document.getElementById("nama").value.trim();
    let email = document.getElementById("email").value.trim();
    if(!validateUserName(username)){
        statusMsg.style.display = "block";
        statusMsg.textContent = "username tidak valid";
        statusMsg.style.color = "red";
        setTimeout(() => {
            statusMsg.style.display = "none";
        }, 5000)
        return false;
    }
    if(!validateEmail(email)){        
        statusMsg.style.display = "block";
        statusMsg.textContent = "email tidak valid";
        statusMsg.style.color = "red";
        setTimeout(() => {
            statusMsg.style.display = "none";
        }, 5000)
        return false;
    }
    return true
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;

statusMsg.style.display = "block";
statusMsg.textContent = "Sedang dikirim...";
statusMsg.style.color = "#00ccff";
buttonSubmit.disabled = true;


fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        statusMsg.textContent = "Pesan berhasil dikirim";
        statusMsg.style.color = "green";
        console.log('Success!', response);
        form.reset();
    })
    .catch(error => {
        statusMsg.textContent = "Pesan gagal dikirim";
        statusMsg.style.color = "red";
        console.error('Error!', error.message);
    })
    .finally(() => {
        buttonSubmit.disabled = false;
        setTimeout(() => {
            statusMsg.style.display = "none";
            form.reset();
        }, 5000);
    })
})