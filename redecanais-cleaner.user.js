// ==UserScript==
// @name         Bloquear Scripts + Limpeza do Site RedeCanais
// @namespace    https://github.com/hpuglia/
// @version      2.0
// @author       Henrique Puglia
// @description  Script customizado para limpar anúncios, domínios e elementos indesejados no site RedeCanaisTV. Permite configurar domínios adicionais.
// @match        :///*
// @icon         https://redecanaistv.ee/favicon.ico
// @updateURL    https://raw.githubusercontent.com/hpuglia/redecanais-cleaner/main/redecanais-cleaner.user.js
// @downloadURL  https://raw.githubusercontent.com/hpuglia/redecanais-cleaner/main/redecanais-cleaner.user.js
// @supportURL   https://github.com/hpuglia/redecanais-cleaner/issues
// @run-at       document-start
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    // Lista padrão de domínios aceitos
    const defaultDomains = [
        "redecanaistv.ee",
        "overflixtv.team",
        "vizertv.fun",
        "pobreflixtv.bid",
        "tvredecanais.bid",
        "redecanais.ee",
        "megafilmeshd50.bid"
    ];

    // Função para configurar domínios adicionais
    function configureDomains() {
        const savedDomains = GM_getValue('customDomains', []);
        const input = prompt(
            "Digite os domínios adicionais que deseja permitir (separados por vírgula):",
            savedDomains.join(", ")
        );

        if (input === null) return; // usuário cancelou, sai imediatamente

        const newList = input.split(",").map(d => d.trim()).filter(Boolean);
        GM_setValue('customDomains', newList);
        alert(Domínios adicionais salvos: ${newList.join(", ")});
    }

    // Adiciona o comando no menu do Tampermonkey
    GM_registerMenuCommand('Configurar domínios', configureDomains);

    // Obtém domínios personalizados
    const customDomains = GM_getValue('customDomains', []);
    const allDomains = [...defaultDomains, ...customDomains];

    // Se o hostname atual não estiver na lista, não roda o script
    if (!allDomains.some(domain => location.hostname.includes(domain))) return;

    const blockedHosts = [
        "redecanais-oficial.chatango.com",
        "securepubads.g.doubleclick.net",
        "st.chatango.com",
        "ep2.adtrafficquality.google",
        "canais.disqus.com"
    ];

    // Função para criar overlay
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

        let seconds = 2;
        counter.innerText = (${seconds});
        const interval = setInterval(() => {
            seconds--;
            counter.innerText = (${seconds});
            if (seconds <= 0) clearInterval(interval);
        }, 1000);
    }

    // Limpeza da página
function cleanPage() {
    document.querySelectorAll("head script, body script").forEach(el => el.remove());
    document.querySelectorAll(
        "center, section.alert, footer, div.aviso-parceria, div.chat-container, div.pm-video-watch-sidebar, div.pm-video-heading"
    ).forEach(el => el.remove());
    console.log("[Tampermonkey] Scripts e elementos removidos!");
    const overlay = document.getElementById("tmk-overlay");
    if (overlay) overlay.remove();
}



    createOverlay();
    window.addEventListener("load", () => {
        setTimeout(cleanPage, 2000);
    });

    // Bloqueio de XHR e fetch
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
            return new Promise(() => { });
        }
        return origFetch.apply(this, arguments);
    };

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
