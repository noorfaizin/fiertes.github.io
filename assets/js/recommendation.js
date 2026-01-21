let currentStep = 0;
const steps = document.querySelectorAll(".step");
const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const perfumes = {
    A: {
        name: "LA SÉRÉNITÉ – Sense of Touch",
        image: "https://noorfaizin.github.io/fiertes/assets/img/product/parfume-D-01.jpg"
    },
    B: {
        name: "SWEET TOOTH – Sense of Taste",
        image: "https://noorfaizin.github.io/fiertes/assets/img/product/parfume-C-01.jpg"
    },
    C: {
        name: "TIMBRE & SAX – Sense of Sound",
        image: "https://noorfaizin.github.io/fiertes/assets/img/product/parfume-B-01.jpg"
    },
    D: {
        name: "BLOOMORA – Sense of Sight",
        image: "https://noorfaizin.github.io/fiertes/assets/img/product/parfume-A-01.jpg"
    }
};

showStep();

function showStep() {
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === currentStep);
    });

    prevBtn.style.display = currentStep === 0 ? "none" : "block";
    nextBtn.style.display = currentStep === steps.length - 1 ? "none" : "block";
    submitBtn.style.display = currentStep === steps.length - 1 ? "block" : "none";
}

function nextStep() {
    if (!validateStep()) return;
    currentStep++;
    showStep();
}

function prevStep() {
    currentStep--;
    showStep();
}

function validateStep() {
    const radios = steps[currentStep].querySelectorAll("input[type='radio']");
    for (let r of radios) {
        if (r.checked) return true;
    }
    alert("Please choose one option");
    return false;
}

document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let scores = { A: 0, B: 0, C: 0, D: 0 };

    ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"].forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        scores[selected.value]++;
    });

    let result = "A";
    for (let key in scores) {
        if (scores[key] > scores[result]) result = key;
    }

    document.getElementById("resultText").innerHTML =
    `<strong>${perfumes[result].name}</strong>`;
    document.getElementById("resultImage").src =
    perfumes[result].image;
    document.getElementById("resultBox").style.display = "block";

    document.querySelector(".navigation").style.display = "none";
    document.getElementById("thankYou").style.display = "block";

    // === TAMPILKAN HASIL ===
    document.getElementById("ask-quiz").classList.add("hidden");
    document.getElementById("result-quiz").classList.remove("hidden");

});

function resetQuiz() {
    document.getElementById("quizForm").reset();
    currentStep = 0;
    
    // === TAMPILKAN HASIL ===
    document.getElementById("ask-quiz").classList.remove("hidden");
    document.getElementById("result-quiz").classList.add("hidden");

    document.getElementById("resultBox").style.display = "none";
    document.getElementById("resultText").innerText = "Complete all steps";
    document.getElementById("resultImage").src = "";
    
    document.querySelector(".navigation").style.display = "flex";
    document.getElementById("thankYou").style.display = "none";
    showStep();
}