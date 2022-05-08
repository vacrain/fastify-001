/*
 * @Author: vacrain
 * @Date: 2022-05-08 07:58:25
 * @LastEditors: vacrain
 * @LastEditTime: 2022-05-09 00:38:22
 * @FilePath: /fastify-001/app.js
 * @Description:
 *
 */
import Fastify from "fastify";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import AutoLoad from "@fastify/autoload";
import fastifyMySQL from "@fastify/mysql";

import Route from "./test/route.js";

const fastify = Fastify({ logger: true });

const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
// /Users/wangxiansheng/Documents/projects/my_now/fastify-001/app.js

const __dirname = dirname(__filename);
// console.log(__dirname);
// /Users/wangxiansheng/Documents/projects/my_now/fastify-001

const user = process.env.DB_USER,
    host = process.env.DB_HOST,
    password = process.env.DB_PASSWORD,
    db1 = process.env.DB_DB1,
    port = process.env.DB_PORT;

const connectStr =
    "mysql://" +
    host +
    ":" +
    port +
    "/" +
    db1 +
    "?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&user=" +
    user +
    "&password=" +
    password;

// console.log(connectStr);

export default async function (fastify, opts) {
    // 必须在autoload上面
    fastify.register(import("./plugins/index.js"));

    fastify.register(fastifyMySQL, {
        connectionString: connectStr,
    });

    fastify.register(AutoLoad, {
        dir: join(__dirname, "routes"),
    });

    fastify.get("/user/:id", (req, reply) => {
        fastify.mysql.getConnection(onConnect);

        function onConnect(err, client) {
            if (err) return reply.send(err);

            client.query(
                "SELECT * FROM people WHERE id=?",
                [req.params.id],
                function onResult(err, result) {
                    client.release();
                    reply.send(err || result);
                }
            );
        }
    });
}

// http://localhost:3456/test1
// fastify.register(Route);

// 直接引入
// fastify.register(import("./test/route.js"));

// http://localhost:3456/
// fastify.get("/", async (req, reply) => {
//     return "hihihi";
// });

// fastify.listen(3000, () => {
//     console.log("running on port 3000");
// });
