import express from "express";
import { config } from "dotenv";
config();
import { connectMySQL } from "./config/mysqldb.js";
import router from "./routes.js";
import swaggerDocs from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import { connectMongoDB } from "./config/mongodb.js";
import cookieParser from "cookie-parser";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('./src/views'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());

async function startServer(params) {
    await connectMySQL();
    await connectMongoDB()
    
    app.get('/', (req, res) => {
        res.render('index');
    });
    
    app.use('/api', router)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer()