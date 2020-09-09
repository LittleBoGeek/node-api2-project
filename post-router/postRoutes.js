const express = require ("express");
const router = express.Router();

const posts = require("./data/db") ;

const {
    findById,
    find,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
  } = require("./data/db");






router.get("/api/posts", (req,res) => {
    posts.find()
    .then((posts) => {
        res.status(200).json(posts)
    }) .catch((error) => {
        console.log(error)
        res.status(500).json({
            error:"The posts information could not be retrieved"
        })
    })
})


router.get("/api/posts/:id", (req,res) => {
    posts.findById(req.params.id)
    .then((post) => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
})

router.get("api/posts/:id/commments", (req,res) => {
    posts.findPostComments(req.params.id, req.params.id)
if (post) {
    res.json(post)
} else {
    res.status(400)
.json({message:"post not found"})}
})

router.post("/api/posts", (req,res) => {
    if(!req.body.title || req.body.contents) {
        return  res.status(400).json({message:"Please provide title and contents for the posts"})
    } 
    posts.instert((req.body) 
    .then((post) => {
        res.status(201).json(post);
    }) .catch((error) => {
        console.log(error)
        res.status(500).json({error:"There was an error while saving the post to the database"})
    })
    
    )
})


router.post("/api/posts/:id/comments", (req,res) => {
    if (!req.body.text) {
        return res.status(400).json({
        message:"Please provide text"
        })
    }
insertComment({text: req.body.text, post_id: req.params.id,})
 .then((comment) => {
     if (comment) {
        res.status(201).json(comment)
     } else {
         res.status(500).json({message:"There was an error"})
     }
    
    }) 
})


router.put("/api/posts/:id", (req,res) => {
if(!req.body.title || !req.body.contents) {
return res.status(400).json({message:"Please provide title and contents for the post"})
}

posts.update(req.params.id, req.body)
.then((post => {
    if (post) {
        res.status(200).json(post)
    } else {
    res.status(404).json({message:"The post with the specified ID does not exist",
})
    }
}) .catch((error) => {
    console.log(error)
    res.status(500).json({error:"The post information could not be modified"})
})

)
})


router.delete("/api/posts/:id", (req, res) => {
    posts.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({message:"Success! Post deleted"})
        } else {
            res.status(404).json({mesage:"The post with the specified ID doesnt exist"})
        }
    }) .catch((error) => {
        console.log(error);
        res.status(500).json({message: "The post could nost be removed"})
    })
}) 

module.exports = router