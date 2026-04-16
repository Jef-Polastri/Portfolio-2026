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