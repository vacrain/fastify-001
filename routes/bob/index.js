/*
 * @Author: vacrain
 * @Date: 2022-05-08 08:51:21
 * @LastEditors: vacrain
 * @LastEditTime: 2022-05-08 08:52:28
 * @FilePath: /fastify-001/routes/bob/index.js
 * @Description:
 *
 */

export default async function (fastify, opts) {
    fastify.get("/", async function (req, reply) {
        return "hihi bob";
    });
}
