document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o formulário de recarregar a página

    // 1. Pegar os valores dos campos
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('message').value;
    const meuNumero = "447864244316"; // COLOQUE SEU NÚMERO AQUI (DDI + DDD + Número)

    // 2. Criar o texto da mensagem formatado
    // encodeURIComponent serve para converter espaços e símbolos para o formato de URL
    const textoFormatado = encodeURIComponent(`Olá, meu nome é ${nome}. \n\n${mensagem}`);

    // 3. Montar o link da API do WhatsApp
    const url = `https://wa.me/${meuNumero}?text=${textoFormatado}`;

    // 4. Abrir em uma nova aba
    window.open(url, '_blank');
    
});

const menuToggle = document.querySelector('.menu-toggle');
const barMenu = document.querySelector('.bar-menu');
const menuLinks = document.querySelectorAll('.menu a');

if (menuToggle && barMenu) {
    menuToggle.addEventListener('click', () => {
        barMenu.classList.toggle('menu-open');
    });
}

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        barMenu.classList.remove('menu-open');
    });
});

const themeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('portfolio-theme');

const updateToggleIcon = (theme) => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('.dark-mode-icon');
    const label = themeToggle.querySelector('.dark-mode-label');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☾' : '☀︎';
    }
    if (label) {
        label.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
};

const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    // swap logo image based on theme
    const logoImg = document.querySelector('.site-logo');
    if (logoImg) {
        logoImg.src = theme === 'dark' ? 'img/logo_yellow.png' : 'img/logo_white.png';
    }
    localStorage.setItem('portfolio-theme', theme);
    updateToggleIcon(theme);
};

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}
// Typing effect for header titles (type, pause, delete, loop)
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.type-target');
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    const typeText = async (el, text, speed) => {
        el.innerHTML = '';
        const textNode = document.createTextNode('');
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        el.appendChild(textNode);
        el.appendChild(cursor);

        for (let i = 0; i < text.length; i++) {
            textNode.data += text[i];
            await sleep(speed);
        }
    };

    const deleteText = async (el, speed) => {
        const textNode = el.childNodes[0];
        if (!textNode) return;
        while (textNode.data.length > 0) {
            textNode.data = textNode.data.slice(0, -1);
            await sleep(speed);
        }
    };

    (async function loopAll() {
        const typeSpeed = 70;
        const deleteSpeed = 35;
        const pauseAfter = 2200; // ms to wait with full text shown

        while (true) {
            for (const el of targets) {
                const text = el.dataset.text || '';
                await typeText(el, text, typeSpeed);
                await sleep(pauseAfter);
                await deleteText(el, deleteSpeed);
                await sleep(250);
            }
        }
    })();
});