const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/user'); // ajuste o caminho para o modelo correto
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis do .env

// Conectar ao banco de dados
const uri = process.env.DB_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Database connected');

    // Crie uma função para criar usuários
    const createUser = async (email, password, role) => {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
        const user = new User({
            email,
            password: hashedPassword,
            role,
            isActive: true, // Pode definir outras propriedades padrão
        });

        await user.save();
        console.log(`Usuário ${role} criado com sucesso`);
    };

    // Verificar se os usuários já existem antes de criar novos
    const existingAdmin = await User.findOne({ role: 'Admin' });
    const existingManager = await User.findOne({ role: 'Manager' });
    const existingClient = await User.findOne({ role: 'Client' });

    if (!existingAdmin) {
        await createUser('admin@example.com', 'admin123', 'Admin');
    }
    if (!existingManager) {
        await createUser('manager@example.com', 'manager123', 'Manager');
    }
    if (!existingClient) {
        await createUser('client@example.com', 'client123', 'Client');
    }

    console.log('Todos os usuários padrão foram criados');
    mongoose.connection.close(); // Fecha a conexão com o banco após a criação
});
