"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileUpload_1 = require("../../controllers/fileUpload");
const uploadNewImage = (fastify) => {
    fastify.post('/upload-image', fileUpload_1.fileUpload);
};
exports.default = uploadNewImage;
