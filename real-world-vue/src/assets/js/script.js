document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav ul');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    var cpfInput = document.getElementById('cpf');
    
    if(cpfInput != null){
        cpfInput.addEventListener('input', function() {
            var value = cpfInput.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
            cpfInput.value = value;
        });
    }
});
