document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../api/perfil.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            const perfilInfo = document.getElementById('perfil-info');
            perfilInfo.innerHTML = `
                <div class='icone-perfil'><i class="bi bi-person-circle"></i></div>
                <p>Nome: ${result.usuario.nome}</p>
                <p>CPF: ${result.usuario.cpf}</p>
                <p>Email: ${result.usuario.email}</p>
                <p>Data de Nascimento: ${result.usuario.data_nascimento}</p>
            `;
            console.log(result);
        } else {
            console.error('Erro ao buscar informações do perfil:', result.message);
            document.getElementById('perfil-info').textContent = 'Erro ao carregar informações do perfil.';
        }
    } catch (error) {
        console.error('Erro ao buscar informações do perfil:', error);
        document.getElementById('perfil-info').textContent = 'Ocorreu um erro. Tente novamente mais tarde.';
    }
});
