/*
 * @Author: vacrain
 * @Date: 2022-05-08 08:05:15
 * @LastEditors: vacrain
 * @LastEditTime: 2022-05-08 08:31:29
 * @FilePath: /fastify-001/test/route.js
 * @Description:
 *
 */

/**
 * @description:
 * @param {import('fastify').FastifyInstance} fastify
 * @param {*} opts
 * @return {*}
 */
export default async function (fastify, opts) {
    fastify.get("/test1", async (req, reply) => {
        reply.code(200).send("got test1 route");
    });
}
