import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;

// Habilitando o CORS
app.use(cors());

// Caminhos fixos para os arquivos JSON
const usuariosFilePath = 'C:\\Users\\Leticia\\Documents\\GitHub\\Passagens\\real-world-vue\\src\\api\\usuarios.json';
const viagensFilePath = 'C:\\Users\\Leticia\\Documents\\GitHub\\Passagens\\real-world-vue\\src\\api\\viagens.json';
const vouchersFilePath = 'C:\\Users\\Leticia\\Documents\\GitHub\\Passagens\\real-world-vue\\src\\api\\vouchers.json';
const historicoFilePath = 'C:\\Users\\Leticia\\Documents\\GitHub\\Passagens\\real-world-vue\\src\\api\\historico.json';

// Rota para obter todos os usuários
app.get('/api/usuarios', async (req, res) => {
    try {
        const data = await fs.readFile(usuariosFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Erro ao ler o arquivo de usuários:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de usuários' });
    }
});


// Rota para obter o histórico
app.get('/api/historico', async (req, res) => {
    try {
        const data = await fs.readFile(historicoFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Erro ao ler o arquivo de histórico:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de histórico' });
    }
});

// Rota para obter um usuário específico pelo ID
app.get('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fs.readFile(usuariosFilePath, 'utf8');
        const usuarios = JSON.parse(data);
        const usuario = usuarios.find(u => u.id === parseInt(id));

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao ler o arquivo de usuários:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de usuários' });
    }
});

// Rota para obter todas as viagens
app.get('/api/viagens', async (req, res) => {
    try {
        const data = await fs.readFile(viagensFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Erro ao ler o arquivo de viagens:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de viagens' });
    }
});

// Rota para obter uma viagem específica pelo ID
app.get('/api/viagens/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fs.readFile(viagensFilePath, 'utf8');
        const viagens = JSON.parse(data);
        const viagem = viagens.find(v => v.id === parseInt(id));

        if (viagem) {
            res.json(viagem);
        } else {
            res.status(404).json({ error: 'Viagem não encontrada' });
        }
    } catch (err) {
        console.error('Erro ao ler o arquivo de viagens:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de viagens' });
    }
});

// Rota para obter todos os vouchers
app.get('/api/vouchers', async (req, res) => {
    try {
        const vouchersData = await fs.readFile(vouchersFilePath, 'utf8');
        const vouchers = JSON.parse(vouchersData);

        const usuariosData = await fs.readFile(usuariosFilePath, 'utf8');
        const usuarios = JSON.parse(usuariosData);

        const viagensData = await fs.readFile(viagensFilePath, 'utf8');
        const viagens = JSON.parse(viagensData);

        const response = vouchers.map(voucher => {
            const viagem = viagens.find(v => v.id === voucher.id_viagem);
            const usuario = usuarios.find(u => u.id === voucher.id_usuario);
            return {
                ...voucher,
                viagem,
                usuario
            };
        });

        res.json(response);
    } catch (err) {
        console.error('Erro ao ler o arquivo de vouchers:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de vouchers' });
    }
});

// Rota para obter vouchers por id do usuário
app.get('/api/vouchers/usuario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const vouchersData = await fs.readFile(vouchersFilePath, 'utf8');
        const vouchers = JSON.parse(vouchersData);

        const usuariosData = await fs.readFile(usuariosFilePath, 'utf8');
        const usuarios = JSON.parse(usuariosData);

        const viagensData = await fs.readFile(viagensFilePath, 'utf8');
        const viagens = JSON.parse(viagensData);

        const usuarioVouchers = vouchers.filter(voucher => voucher.id_usuario === parseInt(id));
        
        const response = usuarioVouchers.map(voucher => {
            const viagem = viagens.find(v => v.id === voucher.id_viagem);
            return {
                ...voucher,
                viagem
            };
        });

        if (response.length > 0) {
            res.json(response);
        } else {
            res.status(404).json({ error: 'Nenhum voucher encontrado para o usuário' });
        }
    } catch (err) {
        console.error('Erro ao ler o arquivo de vouchers:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de vouchers' });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
