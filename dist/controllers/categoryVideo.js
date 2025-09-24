"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryVideoForPublic = void 0;
const prisma_1 = __importDefault(require("../Prisma/prisma"));
const categoryVideoForPublic = async (req, reply) => {
    const categoryVideo = await prisma_1.default.categories.findMany({
        include: {
            videos: true,
        },
    });
    if (!categoryVideo || categoryVideo.length === 0) {
        return reply.status(404).send({ error: "No categories found" });
    }
    reply.send({ videos: categoryVideo });
};
exports.categoryVideoForPublic = categoryVideoForPublic;
