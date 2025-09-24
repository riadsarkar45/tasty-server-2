"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const cloudinary_1 = __importDefault(require("../cloudinary"));
const fileUpload = async (req, reply) => {
    try {
        const file = await req.file();
        if (!file) {
            reply.status(400).send({ success: false, message: "No file uploaded" });
            return;
        }
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder: "fastify_uploads" }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            file.file.pipe(uploadStream);
        });
        reply.status(200).send({
            success: true,
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
        });
    }
    catch (err) {
        req.log.error({ err }, "File upload failed");
        reply.status(500).send({
            success: false,
            message: "Failed to upload file. Please try again later.",
        });
    }
};
exports.fileUpload = fileUpload;
