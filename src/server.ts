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

        this.applyConfigurations()
    }

    private applyConfigurations(): void {
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(express.static('src/public'));

        this.express.set('view engine', 'ejs');
        this.express.set('views', path.join(__dirname, 'views'))

        console.log('✔ Express settings seted');

        this.buildDatabase();
    }

    private buildDatabase(): void {
        database.authenticate()
            .then(() => {
                console.log('✔ Database connected');
                this.buildRoutes();
            }).catch(err => console.error(err));        
    }

    private buildRoutes(): void {
        this.express.use('/', mainRoutes);
        this.express.use('/question', questionRoutes);

        console.log('✔ Routes builded');

        this.startServer();
    }

    private startServer(): void {
        this.express.listen(this.port, () => {
            console.log(`✔ Server is running on http://localhost:${this.port}/`);
        });
    }
}

export default new Main();