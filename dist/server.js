"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_1 = __importDefault(require("./database/database"));
const addNewVideo_1 = __importDefault(require("./pages/services/addNewVideo"));
const cors_1 = __importDefault(require("@fastify/cors"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const addNewImage_1 = __importDefault(require("./pages/services/addNewImage"));
const videos_1 = require("./public/videos");
const app = (0, fastify_1.default)({
    logger: {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                levelFirst: true,
                translateTime: "HH:MM:ss",
                ignore: "pid,hostname",
            },
        },
    },
});
const allowedOrigins = [
    "http://localhost:5173", // dev
    "https://tasty-flax.vercel.app", // prod
];
app.register(cors_1.default, {
    origin: allowedOrigins, // just an array, simplest way
    credentials: true,
});
// Plugins
app.register(multipart_1.default);
app.register(addNewVideo_1.default);
app.register(addNewImage_1.default);
app.register(videos_1.getVideosForPublic, { prefix: "/api/v1/public" });
// Database connection
(0, database_1.default)(app);
//  Root route
app.get("/", async () => {
    app.log.info("Handled / request");
    return { message: "Hello! Fastify server is running 🚀" };
});
// Start server (Render uses this)
const start = async () => {
    try {
        const port = parseInt(process.env.PORT || "10000", 10);
        const address = await app.listen({ port, host: '0.0.0.0' });
        app.log.info(`Server listening at ${address}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
// Only start server if not in serverless
if (require.main === module) {
    start();
}
//Export app for testing or serverless reuse
exports.default = app;
