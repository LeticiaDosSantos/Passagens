<template>
    <div>
        <form @submit.prevent="addUsuario">
            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nome" v-model="nome" required>
            </div>
            <div class="mb-3">
                <label for="cpf" class="form-label">CPF</label>
                <input type="text" class="form-control" id="cpf" v-model="cpf" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
            </div>
            <div class="mb-3">
                <label for="data_nascimento" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="data_nascimento" v-model="data_nascimento" required>
            </div>
            <div class="mb-3">
                <label for="senha" class="form-label">Senha</label>
                <input type="password" class="form-control" id="senha" v-model="senha" required>
            </div>
            <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    name: 'CadastroUsuarioView',
    setup(props, { emit }) {
        const nome = ref('');
        const cpf = ref('');
        const email = ref('');
        const data_nascimento = ref('');
        const senha = ref('');

        const addUsuario = async () => {
            try {
                await axios.post('http://localhost:3001/api/usuarios', {
                    nome: nome.value,
                    cpf: cpf.value,
                    email: email.value,
                    data_nascimento: data_nascimento.value,
                    senha: senha.value,
                });
                emit('user-added'); // Emitir evento para recarregar a lista de usuários
                // Limpar os campos após o cadastro
                nome.value = '';
                cpf.value = '';
                email.value = '';
                data_nascimento.value = '';
                senha.value = '';
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
            }
        };

        return { nome, cpf, email, data_nascimento, senha, addUsuario };
    }
};
</script>
