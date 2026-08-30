document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Se o APK ainda não estiver no repositório, avisa sem impedir a navegação.
document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener("click", () => {
    // O GitHub Pages trata o ficheiro como download porque o link usa o atributo download.
    console.log("Download iniciado:", link.getAttribute("href"));
  });
});
