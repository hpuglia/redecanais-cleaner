# 🧹 RedeCanaisTV Cleaner

![Banner RedeCanais Cleaner](https://iili.io/K39yFBp.png)

Um **UserScript** customizado para limpar anúncios, domínios e elementos indesejados no site **RedeCanaisTV**, proporcionando uma experiência mais limpa e organizada ao navegar.

---

## 🏷️ Status & Badges

![Version](https://img.shields.io/badge/version-3.0-blue)
![Maintenance](https://img.shields.io/badge/maintenance-active-brightgreen)
![Tampermonkey](https://img.shields.io/badge/compatible-Tampermonkey-ff69b4)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## ⚠️ Requisitos

Para o script funcionar corretamente, é **necessário**:

- Ter instalado **AdBlocker** e **Popup Blocker**
- Executar via **Tampermonkey** ou outro gerenciador de UserScripts

> O script foi desenvolvido para melhorar a navegação, **não infringe direitos** e apenas remove elementos visuais e scripts indesejados.

---

## 📝 Funcionalidades

O **RedeCanaisTV Cleaner** realiza:

- 🎨 **Interface limpa:** substituição do CSS para melhor visual
- 🧹 **Limpeza automática:** remove anúncios, alertas, footers e scripts desnecessários
- ⏳ **Overlay de carregamento:** mostra "Limpando site..." enquanto o conteúdo é processado
- 🔓 **DevTools desbloqueado:** libera console e clique direito
- 📺 **Player otimizado:** visualização aprimorada da lista de canais
- 💻 **Scripts tratados:** remoção de scripts desnecessários do body e head
- 🛠️ **Compatibilidade mobile:** ajustes de layout para telas menores
- 🚀 **Execução rápida:** overlay aparece em ~0,5s após o carregamento

### Elementos removidos automaticamente

- `div.unlockr-overlay`  
- `section.alert`  
- `center` e `footer`  
- `#header` e `.aviso-parceria`  

---

## 🎬 Demonstração

![Overlay Limpando Site](https://iili.io/K39yFBp.png)  

> Mostra o overlay "Aguarde..." enquanto a limpeza é executada.

---

## ⚡ Instalação

1. Instale [Tampermonkey](https://www.tampermonkey.net/) no navegador.
2. Clique no botão abaixo para **instalar o script**:

[![Instalar Script](https://img.shields.io/badge/Instalar-RedeCanais%20Cleaner-orange?style=for-the-badge&logo=javascript)](https://raw.githubusercontent.com/hpuglia/redecanaistv-cleaner/main/redecanais-cleaner.user.js)  

[![Instalar no Greasy Fork](https://img.shields.io/badge/🟢-Instalar%20no%20Greasy%20Fork-brightgreen?style=for-the-badge)](https://greasyfork.org/pt-BR/scripts/547696-redecanaistv-cleaner)

---

## 📝 Notas Rápidas

- Compatível com **desktop e mobile**  
- Overlay aparece em **~0,5s** após carregar a página  
- Foco em **limpeza visual**, sem interferir no player ou funcionalidades do site  
- Mantido **ativamente** com atualizações regulares

---

## 👨‍💻 Autor

**Henrique Puglia** – [GitHub](https://github.com/hpuglia)  

---

## 🆘 Suporte

- Relate problemas ou sugira melhorias: [Issues](https://github.com/hpuglia/redecanaistv-cleaner/issues)

---

## 💖 Apoie este projeto

Se você gostou do script e quer apoiar meu trabalho, considere fazer uma doação:  

[![💖 Doar via Nubank](https://img.shields.io/badge/💖-Doar%20via%20Nubank-9c26b0?style=for-the-badge&logo=nubank&logoColor=white)](https://nubank.com.br/cobrar/na7j5/6847d4fc-4652-4c8c-9949-d499d2338b2a)

---

## 📌 Observações

- Rodar o script sem **AdBlocker** ou **Popup Blocker** pode gerar falhas
- Desenvolvido com foco em **limpeza visual** e **usabilidade**
- Mantido e atualizado por **Henrique Puglia**
