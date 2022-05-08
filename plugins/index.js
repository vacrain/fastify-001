/*
 * @Author: vacrain
 * @Date: 2022-05-08 10:04:22
 * @LastEditors: vacrain
 * @LastEditTime: 2022-05-08 15:16:54
 * @FilePath: /fastify-001/plugins/index.js
 * @Description:
 *
 */
import fp from "fastify-plugin";
import faker from "faker";

// 利用faker 创造随机数据
const genres = [...Array(10)].map((v, idx) => ({
    id: idx,
    genre: faker.music.genre(),
}));

// console.log(genres);

/**
 * @description: // 添加一个 或 直接返回 数组
 * @param {*} fastify
 * @param {*} opts
 * @param {*} done
 * @return {*}
 */
const plugin = fp(async function plugin(fastify, opts, done) {
    fastify.decorate("music", (val) => {
        if (val) {
            genres.push({ id: genres.length, genre: val });
        }
        return genres;
    });
});

export default plugin;
