document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../api/viagens.php', {
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
                <p>Origem: ${result.viagens.origem}</p>
                <p>Destino: ${result.viagens.destino}</p>
                <p>Valor: ${result.viagens.valor}</p>
            `;
            console.log(result);
        } else {
            console.error('Erro ao buscar informações do perfil:', result.message);
            document.getElementById('perfil-info').textContent = 'Erro ao carregar informações da viagens.';
        }
    } catch (error) {
        console.error('Erro ao buscar informações do perfil:', error);
        document.getElementById('perfil-info').textContent = 'Ocorreu um erro. Tente novamente mais tarde.';
    }
});
