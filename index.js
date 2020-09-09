const express = require("express")
const postRoutes = require('./post-router/postRoutes')

const server = express()
const port = 5000;

server.use(express.json());
server.use(postRoutes);

server.get("/", (req,res) => {
    res.json({message:"welcome"})
})

server.listen(port, () => {
    console.log(`server runnng at http//localhost:${port}`)
})