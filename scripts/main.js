document.addEventListener('DOMContentLoaded', () => {
    const patterns = [
        { in: 'a', out: 'ai' },
        { in: 'e', out: 'enter' },
        { in: 'i', out: 'imes' },
        { in: 'o', out: 'ober' },
        { in: 'u', out: 'ufat' },
    ];

    function encrypt(text) {
        const textLower = text.toLowerCase();
        let encrypted = '';

        textLower.split('').forEach(t => {
            let found = false;
            patterns.forEach(p => {
                if (p.in === t) {
                    encrypted += p.out;
                    found = true;
                }
            });

            if (!found) {
                encrypted += t;
            }
        });

        return encrypted;
    }

    function decrypt(text) {
        let decrypted = text.toLowerCase();
        patterns.forEach(p => {
            decrypted = decrypted.replaceAll(p.out, p.in);
        });
        return decrypted;
    }

    const toast = document.querySelector(".toast");
    let toastTimeout;

    function showToast(msg) {
        toast.innerText = `${msg}`;
        toast.classList.add("active");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(hideToast, 2500);
    }

    function hideToast() {
        toast.classList.remove("active");
    }

    const btnEncrypt = document.querySelector("#btn-encrypt");
    const btnDecrypt = document.querySelector("#btn-decrypt");
    const btnCopy = document.querySelector("#btn-copy");

    const textInput = document.querySelector(".textarea");
    const resultContainer = document.querySelector(".result");
    const noResultContainer = document.querySelector(".no-result");
    

//essas 2
const hideTitle = document.querySelector("no-result__title");
    function hideResultContainer() {
        resultContainer.classList.remove("active");
    }

    textInput.addEventListener("input", (e) => {
        textInput.value = normalizeString(e.target.value);
    });
//essa
    function getResultText() {
        const resultTag = document.querySelector(".no-result__text");
        return resultTag.innerText;
    }

    function hideResultContainer() {
        resultContainer.classList.remove("active");
    }

    function showResultContainer() {
        resultContainer.classList.add("active");
    }

    function hideNoResultContainer() {
        noResultContainer.classList.add("inactive");
    }

    function showNoResultContainer() {
        noResultContainer.classList.remove("inactive");
    }
//essa
    function setResult(result) {
        const resultTag = document.querySelector(".no-result__text");
        resultTag.innerText = result;
    }

    function setTextInputValue(result) {
        textInput.value = result;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    function onCopy() {
        copyToClipboard(getResultText());
        textInput.focus();
        showToast("Texto copiado");
    }

    function onEncrypt() {
        if (textInput.value.trim()) {
            const encrypted = encrypt(normalizeString(textInput.value));
            hideNoResultContainer();
            showResultContainer();
            setResult(encrypted);
            setTextInputValue("");

            const resultTag = document.querySelector(".no-result__text");
            resultTag.innerText = `${encrypted}`;
            noResultContainer.classList.add("inactive");
            resultContainer.classList.add("active");

            showToast("Texto criptografado");
            textInput.focus();
        } else {
            showNoResultContainer();
            hideResultContainer();
        }
    }

    function normalizeString(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function onDecrypt() {
        if (textInput.value.trim()) {
            const decrypted = decrypt(normalizeString(textInput.value));
            hideNoResultContainer();
            showResultContainer();
            setResult(decrypted);
            setTextInputValue("");

            const resultTag = document.querySelector(".no-result__text");
            resultTag.innerText = `${decrypted}`;
            noResultContainer.classList.add("inactive");
            resultContainer.classList.add("active");

            showToast("Texto descriptografado");
            textInput.focus();
            
        } else {
            showNoResultContainer();
            hideResultContainer();
        }
    }

    btnEncrypt.addEventListener("click", onEncrypt);
    btnDecrypt.addEventListener("click", onDecrypt);
    btnCopy.addEventListener("click", onCopy);
});
