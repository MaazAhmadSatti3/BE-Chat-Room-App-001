import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import {MainApi} from "./routes/index"
import { DbMongo } from "./config/mongodb.conn";
import { Server } from "http";
const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();
import { MongoCluster,MongoDbName,Mongo_Pass,Mongo_user_name } from "./utils/constant"
let server: Server | null = null;
const PORT = process.env.PORT || 1000;
function initApplication(): express.Application {
    new DbMongo().connect(MongoCluster,MongoDbName,Mongo_user_name,Mongo_Pass);
    const app = express();
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/health', health.LivenessEndpoint(healthcheck))
    app.use('/ready', health.ReadinessEndpoint(healthcheck));
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        }
    }));
    app.use(MainApi);
    app.use(
        (err: any, req: Request, res: Response, next: NextFunction) => {
            res.locals.message = err.message;
            const status = err.statusCode || 300;
            res.locals.status = status;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(status);
            return res.json({
                error: {
                    message: err.message
                }
            });
        }
    );
    return app;
}
function start() {
    const app = initApplication();

    server = app.listen(process.env.PORT || PORT, () => {
        console.log(`running on ${'http://localhost:'}${PORT}/swagger`);
    });
}
// Start the application
start();