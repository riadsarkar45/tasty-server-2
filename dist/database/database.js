"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = databaseCon;
const prisma_1 = __importDefault(require("../Prisma/prisma"));
async function databaseCon(fastify) {
    fastify.addHook('onReady', async () => {
        try {
            await prisma_1.default.$connect();
            fastify.log.info('✅ Prisma connected to database');
        }
        catch (err) {
            // ✅ Type guard: check if it's an Error
            if (err instanceof Error) {
                fastify.log.error('❌ Failed to connect Prisma: %s', err.message);
                // Or log structured:
                fastify.log.error({ error: err.message }, 'Prisma connection failed');
            }
            else {
                // Handle unknown error (e.g. string, null, object)
                fastify.log.error('❌ Unknown error connecting to Prisma');
            }
            process.exit(1);
        }
    });
    fastify.decorate('prisma', prisma_1.default);
}
