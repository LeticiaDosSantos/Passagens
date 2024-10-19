document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../api/permissao.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        const perfilInfo = document.getElementById('perfil-info');
        var permissao = result.permissao.titulo;
        if (response.ok) {
            var html = `<div class="row">`;

            html += `
            <div class="col-sm-3 atalhos">
                <div class="card">
                <div class="card-body card-atalho">
                    <h5 class="card-title">Histórico</h5>
                </div>
                </div>
            </div>
            <div class="col-sm-3 atalhos">
                <div class="card">
                <div class="card-body card-atalho">
                    <img src="../passes.png" alt="Imagem Redonda" class="imagem-redonda">
                    <h5 class="card-title">Meus Vouchers</h5>
                </div>
                </div>
            </div>`;

            if(permissao == "Administrador" || permissao == "Atendente"){
                html += `
                    <div class="col-sm-3 atalhos">
                        <div class="card">
                        <div class="card-body card-atalho">
                            <h5 class="card-title">Recarga</h5>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-3 atalhos">
                        <div class="card">
                        <div class="card-body card-atalho">
                            <h5 class="card-title">Usuários</h5>
                        </div>
                        </div>
                    </div>
                `;
            }

            if(permissao == "Administrador" || permissao == "Cobrador"){
                html += `
                        <div class="col-sm-3 atalhos">
                            <div class="card">
                            <div class="card-body card-atalho">
                                <h5 class="card-title">Cobrar</h5>
                            </div>
                            </div>
                        </div>
                `;
            }
            
            html += `
                    <div class="col-sm-3 atalhos">
                        <div class="card">
                            <div class="card-body card-atalho">
                                <img src="/lib/img/viagens.php">
                                <a href="../view/viagens.php" class="card-title"><h5>Viagens</h5></a>
                            </div>
                        </div>
                    </div>
            `;

            html += `</div>`;
            perfilInfo.innerHTML = html;
        } else {
            console.error('Erro ao buscar as permissões do usuário:', result.message);
            document.getElementById('perfil-info').textContent = 'Erro ao carregar informações das permissões.';
        }
    } catch (error) {
        console.error('Erro ao buscar as permissões do usuário:', error);
        document.getElementById('perfil-info').textContent = 'Ocorreu um erro. Tente novamente mais tarde.';
    }
});
