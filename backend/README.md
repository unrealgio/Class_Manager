# Backend do Projeto API Fullstack 164

Este projeto é a parte backend de uma aplicação fullstack. Ele utiliza Node.js com Express e Sequelize para gerenciar a API e a conexão com o banco de dados PostgreSQL.

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do diretório `backend` e adicione as seguintes variáveis de ambiente:

```env
DB_DATABASE=
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432
PORT=3001
SECRET_KEY=
URL=
SENHA_PADRAO=
```

## Inicializando o Servidor Backend

1. Navegue até o diretório do backend:
    ```sh
    cd ./pi-fullstack-164/backend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie o servidor:
    ```sh
    npm start
    ```

## Estrutura do Projeto

- `src/`: Contém o código fonte do backend.
  - `config/`: Configurações do banco de dados.
  - `middleware/`: Middlewares de autenticação e controle de acesso.
  - `modules/`: Módulos da aplicação (usuário, turma, frequência).
    - `frequencia/`: Gerenciamento de frequência.
    - `turma/`: Gerenciamento de turmas e ciclos.
    - `usuario/`: Gerenciamento de usuários.
- `README.md`: Este arquivo com instruções.
- `.env`: Arquivo de variáveis de ambiente.
- `.gitignore`: Arquivo para ignorar arquivos e diretórios no Git.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.





















































