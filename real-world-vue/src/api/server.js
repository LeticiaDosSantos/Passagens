import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 3001;

// Habilitando o CORS
app.use(cors());

// Função para obter o caminho correto para o arquivo
const getFilePath = () => {
    return path.join(path.dirname(new URL(import.meta.url).pathname), 'usuarios.json');
};

// Rota para obter todos os usuários
app.get('/api/usuarios', async (req, res) => {
    const filePath = 'C:\\Users\\Leticia\\Documents\\GitHub\\Passagens\\real-world-vue\\src\\api\\usuarios.json';

    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo' });
    }
});

// Rota para obter um usuário específico pelo ID
app.get('/api/usuarios/:id', async (req, res) => {
    const filePath = 'C:\\Users\\Leticia\\Documents\\GitHub\\Passagens\\real-world-vue\\src\\api\\usuarios.json';
    const { id } = req.params;

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const usuarios = JSON.parse(data);
        const usuario = usuarios.find(u => u.id === parseInt(id));

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo' });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
