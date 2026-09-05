// 1. Atualizar Ano do Footer
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 3. Log de Downloads no Console
document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener("click", () => {
    console.log("Download iniciado:", link.getAttribute("href"));
  });
});

// 4. Relógio em Tempo Real (no Mockup do Telemóvel)
function updatePhoneTime() {
    const el = document.getElementById("phoneTime");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false // Formato 24h
    });
}
updatePhoneTime();
setInterval(updatePhoneTime, 30000); // Atualiza a cada 30 segundos
document.addEventListener("visibilitychange", function () {
    if (!document.hidden) updatePhoneTime();
});

// 5. Interatividade do Mockup (Clicar nas moedas e somar)
let phoneTotal = 0;
const phoneGoal = 500;

function formatEuro(value) {
    return "€ " + value.toLocaleString("pt-PT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function updateMockupUI() {
    const balanceEl = document.getElementById("phoneBalance");
    const progressEl = document.getElementById("phoneProgress");
    if (!balanceEl || !progressEl) return;

    // Atualiza o texto do Saldo
    balanceEl.textContent = formatEuro(phoneTotal);

    // Atualiza a Barra de Progresso
    let pct = (phoneTotal / phoneGoal) * 100;
    if (pct > 100) pct = 100;
    progressEl.style.width = pct + "%";
}

// Associar clique a cada botão de moeda
document.querySelectorAll("#coinGrid div").forEach(coinBtn => {
    coinBtn.addEventListener("click", function () {
        const val = parseFloat(this.getAttribute("data-value"));
        if (!isNaN(val)) {
            phoneTotal = Math.round((phoneTotal + val) * 100) / 100; // Evita bugs de decimais do JS
            updateMockupUI();
        }
    });
});

// Estado inicial: 0,00 €
updateMockupUI();
