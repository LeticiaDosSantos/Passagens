<script setup>
</script>

<template>
    <div class="container login-centralizado">
        <h2 class="title-page">Login</h2>
        <form id="loginForm" action="#" method="POST">
            <div class="mb-3">
                <label for="cpf" class="form-label">CPF:</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
                    <input type="text" class="form-control" id="cpf" name="cpf" placeholder="000.000.000-00" required>
                </div>
            </div>

            <div class="mb-3">
                <label for="senha" class="form-label">Senha:</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-file-lock2"></i></span>
                    <input type="password" class="form-control" id="senha" name="senha" placeholder="••••••••" required>
                </div>
                <a href="#" class="recuperar-senha">Recuperar senha</a>
            </div>
            
            <RouterLink :to="{ name: 'perfil' }">
                <button class="azul-escuro">Entrar</button>
            </RouterLink>
        </form>
    </div>
</template>

<style>
.azul-escuro{
    background-color: #0030b9;
    border: none;
    color: white;
    padding: 0.5%;
    width: 10%;
    border-radius: 2rem;
}
</style>