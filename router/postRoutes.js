const express = require('express')
const postController = require('../contollers/postController')
const router = express.Router()


router.route('/')
.get(postController.getAllPosts)
.post(postController.createPost)
.delete(postController.deleteAllPosts)

router.route('/:id')
.get(postController.getOnePost)
.patch(postController.updatePost)
.delete(postController.deletePost)

module.exports = router;