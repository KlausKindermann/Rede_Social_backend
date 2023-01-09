import express from 'express'
import cors from 'cors'

const server = express()
const PORT = 5000
server.use(express.json())
server.use(cors());


let cadastro = [];
let tweets = [];

server.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    cadastro.push({ username, avatar });
    res.send({ message: "OK" })
});

server.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;
    if (!user) {
        res.status(401).send({ error: "UNAUTHORIZED" });
        return;
    }
    tweets.push({ username: user, tweet });
    res.send({ message: "OK" })
});

server.get("/tweets", (req, res) => {
    tweets.forEach((tweet) => {
        const { avatar } = cadastro.find((user) => user.username === tweet.username);
        tweet.avatar = avatar;
    });
    res.send(tweets.slice(-10).reverse());
});


server.listen(PORT, () => console.log("oi, to rodando"))