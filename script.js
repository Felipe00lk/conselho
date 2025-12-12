const btn = document.getElementById("btn");
const adviceText = document.querySelector(".advice-text");

btn.addEventListener("click", async () => {
    adviceText.textContent = "Carregando...";

    try {
        const resposta = await fetch("https://api.adviceslip.com/advice");
        const dados = await resposta.json();

        adviceText.textContent = `"${dados.slip.advice}"`;
    } catch (error) {
        adviceText.textContent = "Não consegui gerar um conselho 😢";
    }
});
