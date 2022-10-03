//importing all depedencies and modules
import path from 'path';
import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import database from './models/database';

import mainRoutes from './routes/main.routes';
import questionRoutes from './routes/question.routes';

dotenv.config();

class Main {

    public express;
    public port = process.env.SERVER_PORT;

    constructor() {
        this.express = express();

        this.applyConfigurations();
        this.buildDatabase();
        this.buildRoutes();

        setTimeout(() => this.startServer(), 3000);
    }

    private applyConfigurations(): void {
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(express.static('src/public'));

        this.express.set('view engine', 'ejs');
        this.express.set('views', path.join(__dirname, 'views'))

        console.log('[✔] Configurações aplicadas!');
    }

    private buildDatabase(): void {
        database.authenticate()
            .then(() => console.log('[✔] Conexão estabelecida com a base de dados!'))
            .catch(err => console.error(err));        
    }

    private buildRoutes(): void {
        this.express.use('/', mainRoutes);
        this.express.use('/question', questionRoutes);

        console.log('[✔] Rotas construídas!');
    }

    private startServer(): void {
        this.express.listen(this.port, () => {
            console.log(`[✔] Servidor iniciado em http://localhost:${this.port}/`);
        });
    }
}

export default new Main();