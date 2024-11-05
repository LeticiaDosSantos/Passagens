<template>
    <div class="container mt-5">
        <h2 class="title-page">Usuários</h2>
        <div class="mb-3 input-group">
            <span class="input-group-text">
                <!-- Ícone de Lupa do Bootstrap -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.08 1.08l3.77 3.77a1 1 0 0 0 1.415-1.415l-3.77-3.77zM6.5 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
                </svg>
            </span>
            <input
                type="text"
                class="form-control"
                placeholder="Pesquisar por nome, permissão, email ou CPF"
                v-model="searchQuery"
            />
            <span class="input-group-text" @click="clearSearch" style="cursor: pointer;">
                <!-- Ícone de "X" do Bootstrap -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
            <button class="btn btn-primary ms-2 azul-escuro" @click="showModal">
                Novo
            </button>
        </div>

        <div v-if="loading" class="alert alert-info">Carregando...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <table class="table table-striped" v-if="!loading && !error">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Permissão</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Data de Nascimento</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in filteredUsuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.permissao }}</td>
                    <td>{{ usuario.nome }}</td>
                    <td>{{ usuario.cpf }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.data_nascimento }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Modal para Cadastro -->
        <div class="modal fade" id="cadastroModal" tabindex="-1" aria-labelledby="cadastroModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cadastroModalLabel">Cadastrar Novo Usuário</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="nome" class="form-label">Nome</label>
                                <input type="text" id="nome" v-model="newUser.nome" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="cpf" class="form-label">CPF</label>
                                <input type="text" id="cpf" v-model="newUser.cpf" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="permissao" class="form-label">Permissão</label>
                                <input type="text" id="permissao" v-model="newUser.permissao" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" v-model="newUser.email" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="data_nascimento" class="form-label">Data de Nascimento</label>
                                <input type="date" id="data_nascimento" v-model="newUser.data_nascimento" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" id="senha" v-model="newUser.senha" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
    name: 'UsuariosListaView',
    setup() {
        const usuarios = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const searchQuery = ref('');
        const newUser = ref({
            nome: '',
            cpf: '',
            permissao: '',
            email: '',
            data_nascimento: '',
            senha: ''
        });

        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/usuarios');
                usuarios.value = response.data;
            } catch (err) {
                error.value = 'Erro ao carregar os usuários.';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchUsuarios);

        const filteredUsuarios = computed(() => {
            if (!searchQuery.value) {
                return usuarios.value;
            }
            const query = searchQuery.value.toLowerCase();
            return usuarios.value.filter(usuario => 
                usuario.nome.toLowerCase().includes(query) ||
                usuario.email.toLowerCase().includes(query) ||
                usuario.cpf.includes(query)
            );
        });

        const clearSearch = () => {
            searchQuery.value = '';
        };

        const showModal = () => {
            const modal = new bootstrap.Modal(document.getElementById('cadastroModal'));
            modal.show();
        };

        const submitForm = async () => {
            try {
                await axios.post('http://localhost:3001/api/usuarios', newUser.value);
                alert('Usuário cadastrado com sucesso!');
                // Limpar os campos do formulário e recarregar a lista de usuários
                newUser.value = {
                    nome: '',
                    cpf: '',
                    permissao: '',
                    email: '',
                    data_nascimento: '',
                    senha: ''
                };
                fetchUsuarios();
                const modal = bootstrap.Modal.getInstance(document.getElementById('cadastroModal'));
                modal.hide();
            } catch (error) {
                console.error(error);
                alert('Erro ao cadastrar o usuário.');
            }
        };

        return { usuarios, loading, error, searchQuery, filteredUsuarios, clearSearch, showModal, newUser, submitForm };
    }
};
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>
