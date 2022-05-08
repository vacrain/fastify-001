/*
 * @Author: vacrain
 * @Date: 2022-05-08 07:58:25
 * @LastEditors: vacrain
 * @LastEditTime: 2022-05-08 10:30:21
 * @FilePath: /fastify-001/app.js
 * @Description:
 *
 */
import Fastify from "fastify";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import AutoLoad from "@fastify/autoload";

import Route from "./test/route.js";

const fastify = Fastify({ logger: true });

const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
// /Users/wangxiansheng/Documents/projects/my_now/fastify-001/app.js

const __dirname = dirname(__filename);
// console.log(__dirname);
// /Users/wangxiansheng/Documents/projects/my_now/fastify-001

export default async function (fastify, opts) {
    // 必须在autoload上面
    fastify.register(import("./plugins/index.js"));

    fastify.register(AutoLoad, {
        dir: join(__dirname, "routes"),
    });

    // http://localhost:3456/test1
    fastify.register(Route);
    // 直接引入
    // fastify.register(import("./test/route.js"));

    // http://localhost:3456/
    // fastify.get("/", async (req, reply) => {
    //     return "hihihi";
    // });

    // fastify.listen(3000, () => {
    //     console.log("running on port 3000");
    // });
}
