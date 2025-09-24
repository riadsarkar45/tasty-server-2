"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = polls;
const createNewPoll_1 = require("../../controllers/createNewPoll");
async function polls(fastify) {
    fastify.post('/newpoll', {
        schema: {
            body: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['startTime', 'duration', 'type'],
                    properties: {
                        type: { type: 'string' },
                        startTime: { type: 'number' },
                        duration: { type: 'number' },
                        question: { type: 'string' },
                        videoId: { type: 'string' },
                        options: {
                            type: 'array',
                            items: { type: 'string' },
                            minItems: 2
                        },
                        imageUrl: { type: 'string' },
                        textTitle: { type: 'string' },
                        textDesc: { type: 'string' }
                    }
                }
            }
        },
        handler: createNewPoll_1.addNewPoll
    });
    fastify.post('/create-video', {
        schema: {
            body: {
                type: 'object',
                required: ['videoId', 'videoUrl', 'createdBy']
            }
        }
    }, createNewPoll_1.createNewVideo);
    fastify.get("/polls", createNewPoll_1.getPolls);
    fastify.post('/poll-submission', {
        schema: {
            body: {
                type: 'object',
                // required: ['submittedBy', 'selectedOption', 'pollOptionId', 'pollId'], // ✅ Fixed: likely meant pollId
                properties: {
                    submittedBy: { type: 'string' },
                    selectedOption: { type: 'string' },
                    pollOptionId: { type: 'integer' }, // or 'number' if float possible
                    pollId: { type: 'integer' } // Important: used to prevent duplicate votes
                }
            }
        },
        handler: createNewPoll_1.submitPollResponse
    });
    fastify.get('/videos/:videoId?', createNewPoll_1.getCreatedVideos);
}
