// ==UserScript==
// @name         Bloquear Scripts + Limpeza do Site RedeCanais
// @namespace    https://github.com/hpuglia/
// @version      1.6
// @author       Henrique Puglia
// @description  Script customizado para limpar anúncios, domínios e elementos indesejados no site RedeCanaisTV. Exibe overlay "Aguarde..." até finalizar a limpeza.
// @match        https://redecanaistv.ee/*
// @icon         https://redecanaistv.ee/favicon.ico
// @updateURL    https://raw.githubusercontent.com/hpuglia/redecanais-cleaner/main/redecanais-cleaner.user.js
// @downloadURL  https://raw.githubusercontent.com/hpuglia/redecanais-cleaner/main/redecanais-cleaner.user.js
// @supportURL   https://github.com/hpuglia/redecanais-cleaner/issues
// @run-at       document-start
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    const blockedHosts = [
        "redecanais-oficial.chatango.com",
        "securepubads.g.doubleclick.net",
        "st.chatango.com",
        "ep2.adtrafficquality.google",
        "canais.disqus.com"
    ];

    // Cria overlay
    function createOverlay() {
        const overlay = document.createElement("div");
        overlay.id = "tmk-overlay";
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            color: #fff;
            font-size: 24px;
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 999999;
        `;

        const text = document.createElement("div");
        text.innerText = "Aguarde...";

        const counter = document.createElement("div");
        counter.id = "tmk-counter";
        counter.style.marginTop = "10px";
        counter.style.fontSize = "18px";

        overlay.appendChild(text);
        overlay.appendChild(counter);
        document.documentElement.appendChild(overlay);

        // contador regressivo de 2s
        let seconds = 2;
        counter.innerText = `(${seconds})`;
        const interval = setInterval(() => {
            seconds--;
            counter.innerText = `(${seconds})`;
            if (seconds <= 0) clearInterval(interval);
        }, 1000);
    }

    // Remove scripts e elementos indesejados
    function cleanPage() {
        // remove <script>
        document.querySelectorAll("head script, body script").forEach(el => el.remove());

        // remove <center>, <section class="alert">, <footer>, <div class="aviso-parceria">
        document.querySelectorAll("center, section.alert, footer, div.aviso-parceria").forEach(el => el.remove());

        console.log("[Tampermonkey] Scripts e elementos removidos!");

        // remove overlay
        const overlay = document.getElementById("tmk-overlay");
        if (overlay) overlay.remove();
    }

    // Cria overlay já no início
    createOverlay();

    // Executa limpeza após carregamento + 2s
    window.addEventListener("load", () => {
        setTimeout(cleanPage, 2000);
    });

    // Intercepta XHR e fetch
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (blockedHosts.some(host => url.includes(host))) {
            console.log("[Tampermonkey] Bloqueado XHR:", url);
            return;
        }
        return origOpen.apply(this, arguments);
    };

    const origFetch = window.fetch;
    window.fetch = function () {
        const url = arguments[0];
        if (blockedHosts.some(host => url.includes(host))) {
            console.log("[Tampermonkey] Bloqueado fetch:", url);
            return new Promise(() => { }); // nunca resolve
        }
        return origFetch.apply(this, arguments);
    };

    // Bloqueia <script src="...">
    const origCreate = document.createElement;
    document.createElement = function (tag) {
        const el = origCreate.call(document, tag);
        if (tag.toLowerCase() === "script") {
            const origSetAttr = el.setAttribute;
            el.setAttribute = function (name, value) {
                if (name === "src" && blockedHosts.some(host => value.includes(host))) {
                    console.log("[Tampermonkey] Script bloqueado:", value);
                    return;
                }
                return origSetAttr.apply(this, arguments);
            };
        }
        return el;
    };

})();
