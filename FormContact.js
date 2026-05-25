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