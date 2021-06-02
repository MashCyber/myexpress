const express = require('express')
const postController = require('../contollers/postController')
const { isLoggin } = require('../middleware/middleware')
const router = express.Router()


router.route('/')
.get(isLoggin, postController.getAllPosts)
.post(isLoggin,postController.createPost)
.delete(isLoggin,postController.deleteAllPosts)

router.route('/:id')
.get(isLoggin,postController.getOnePost)
.patch(isLoggin,postController.updatePost)
.delete(isLoggin,postController.deletePost)

module.exports = router;