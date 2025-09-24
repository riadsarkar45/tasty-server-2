"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideosForPublic = void 0;
const categoryVideo_1 = require("../controllers/categoryVideo");
const getVideosForPublic = async (fastify) => {
    fastify.get('/videos', categoryVideo_1.categoryVideoForPublic);
};
exports.getVideosForPublic = getVideosForPublic;
