/*
 * @Author: vacrain
 * @Date: 2022-05-08 08:45:58
 * @LastEditors: vacrain
 * @LastEditTime: 2022-05-08 15:12:00
 * @FilePath: /fastify-001/routes/index.js
 * @Description:
 *
 */

const postOptions = {
    schema: {
        body: {
            // 请求体的要求
            type: "object",
            required: ["genre"],
            genrr: { type: "string" },
        },
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        genre: { type: "string" },
                    }, // 只有genre，这样只返回genre : some genre 了。没有 id了
                },
            },
        },
    },
};

export default async function (fastify, opts) {
    const genres = fastify.music();

    fastify.get("/", async function (req, reply) {
        return genres;
    });

    // select by id
    fastify.get("/:id", async function (req, reply) {
        try {
            const genre = genres.find((genre) => genre.id === +req.params.id); // + 用来转number
            return genre;
        } catch (error) {
            reply.code(404).send("nothing " + error);
        }
    });

    // add
    fastify.post("/", postOptions, async function (req, reply) {
        const { genre } = req.body;
        if (!genre) {
            reply.code(404).send(nothing);
        }
        const listOfGenres = fastify.music(genre);
        return listOfGenres;
    });
}
