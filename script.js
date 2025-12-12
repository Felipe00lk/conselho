const btn = document.getElementById("btn");
const adviceText = document.querySelector(".advice-text");
const idiomaSelect = document.getElementById("idioma");

btn.addEventListener("click", async () => {
    adviceText.textContent = "Carregando...";

    try {
        // Pega o idioma escolhido
        const idioma = idiomaSelect.value;

        // Consulta o conselho em inglês (API só fornece EN)
        const resposta = await fetch("https://api.adviceslip.com/advice");
        const dados = await resposta.json();

        const textoOriginal = dados.slip.advice;

        // Se a pessoa escolher inglês, não traduz
        if (idioma === "en") {
            adviceText.textContent = `"${textoOriginal}"`;
            return;
        }

        // Traduz EN → PT ou EN → ZH usando API gratuita
        const traducao = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoOriginal)}&langpair=en|${idioma}`
        );

        const dadosTrad = await traducao.json();
        const textoTraduzido = dadosTrad.responseData.translatedText;

        adviceText.textContent = `"${textoTraduzido}"`;

    } catch (error) {
        adviceText.textContent = "Erro ao gerar conselho 😢";
    }
});
