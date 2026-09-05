// ─────────────────────────────
// GERAL
// ─────────────────────────────

// Ano do Footer
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Log de Downloads
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener("click", () => {
        console.log("Download iniciado:", link.getAttribute("href"));
    });
});


// ─────────────────────────────
// RELÓGIO EM TEMPO REAL
// ─────────────────────────────
function updatePhoneTime() {
    const el = document.getElementById("phoneTime");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}
updatePhoneTime();
setInterval(updatePhoneTime, 30000);
document.addEventListener("visibilitychange", function () {
    if (!document.hidden) updatePhoneTime();
});


// ─────────────────────────────
// MEALHEIRO INTERATIVO
// ─────────────────────────────
let phoneTotal = 0;
const phoneGoal = 500;
let historyItems = [];

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

    balanceEl.textContent = formatEuro(phoneTotal);

    let pct = (phoneTotal / phoneGoal) * 100;
    if (pct > 100) pct = 100;
    progressEl.style.width = pct + "%";

    // Animação pop
    balanceEl.classList.remove("pop");
    void balanceEl.offsetWidth;
    balanceEl.classList.add("pop");
}

function addValue(val) {
    val = parseFloat(val);
    if (isNaN(val)) return;

    phoneTotal = Math.round((phoneTotal + val) * 100) / 100;

    // Adiciona ao histórico
    const now = new Date();
    const timeStr = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    historyItems.unshift({
        value: val,
        time: timeStr,
        label: val >= 1 ? formatEuro(val) : (val * 100).toFixed(0) + "c"
    });

    // Limitar histórico a 30 itens
    if (historyItems.length > 30) historyItems.pop();

    updateHistoryUI();
    updateMockupUI();
}

function updateHistoryUI() {
    const list = document.getElementById("historyList");
    if (!list) return;

    if (historyItems.length === 0) {
        list.innerHTML = `<p class="history-empty">Ainda não há transações.</p>`;
        return;
    }

    list.innerHTML = historyItems.map(item => `
        <div class="history-item">
            <div>
                <div class="h-label">Adicionado ${item.label}</div>
                <div class="h-time">${item.time}</div>
            </div>
            <div class="h-value">+${formatEuro(item.value)}</div>
        </div>
    `).join("");
}


// ─────────────────────────────
// CLIQUE EM MOEDAS E NOTAS
// ─────────────────────────────
document.querySelectorAll(".coins div, .notes div").forEach(btn => {
    btn.addEventListener("click", function () {
        const val = this.getAttribute("data-value");
        addValue(val);
    });
});


// ─────────────────────────────
// TABS (Moedas / Notas / Histórico)
// ─────────────────────────────
document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", function () {
        const target = this.getAttribute("data-tab");

        // Muda botão ativo
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        // Muda conteúdo ativo
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        document.getElementById("tab-" + target).classList.add("active");
    });
});


// ─────────────────────────────
// BOTÃO REINICIAR
// ─────────────────────────────
document.getElementById("resetBtn").addEventListener("click", function () {
    if (phoneTotal === 0 && historyItems.length === 0) return;
    if (confirm("Queres mesmo reiniciar o mealheiro para € 0,00?")) {
        phoneTotal = 0;
        historyItems = [];
        updateMockupUI();
        updateHistoryUI();
    }
});


// Estado inicial
updateMockupUI();
updateHistoryUI();
