# Capitalism Battle Royale

**Capitalism Battle Royale** é um jogo de sobrevivência online focado em lógica, automação e interatividade multiplayer. Este README detalha o funcionamento técnico, o código principal do projeto e como configurá-lo.

---

## Arquitetura do Projeto

O projeto é dividido em duas partes principais:

1. **Backend**:
   - Utiliza **Node.js** com **Socket.io** para comunicação em tempo real.
   - Gerencia estados globais do jogo, eventos dos jogadores e sincronização entre clientes.
   - Estruturado com rotas para autenticação, gerenciamento de sessões e eventos do jogo.

2. **Frontend**:
   - Desenvolvido com **React** e **Three.js** para renderização em 3D.
   - Implementa controle de personagens, interface de usuário e comunicação com o servidor.

---

## Instalação e Uso

1. Clone este repositório:
   ```bash
   git clone https://github.com/sSmalKk/CapitalismBattleRoyale.git
   cd CapitalismBattleRoyale
Configure o Backend:

bash
Copiar código
cd server
npm install
npm run dev
O servidor estará rodando na porta 3001.
Configure o Frontend:

bash
Copiar código
cd ../client
npm install
npm run dev
Acesse o jogo no navegador em http://localhost:3000.
Jogue:

O jogo é online e sincroniza todos os jogadores conectados ao servidor.

