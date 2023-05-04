const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

const createNewPost = async (req, res) => {
  //게시글 작성
  const { title, content } = req.body
  const createdata = await Posts.create({ title, content });
  return res.json({
    id: createdata.id,
    title: createdata.title,
    content: createdata.content
  });
};

const getAllPosts = async (req, res) => {
  // 게시글 전체 조회
  const getdata = await Posts.findAll({
    attributes: ['id', 'title', 'content']
  });

  return res.json(getdata);
};

const updatePost = async (req, res) => {
  // 게시글 수정
  const { postId } = req.params;
  const { title, content } = req.body;

  await Posts.update(
    { title, content },
    { where: { id : postId } }
  );

  const updatepost = await Posts.findOne({
    attributes: ['id', 'title', 'content'],
    where: { id : postId }
  })

  return res.json(updatepost);
};

const deletePostById = async (req, res) => {
  // 게시글 삭제
  const { postId } = req.params;
  await Posts.destroy({ where : { id : postId } });
  return res.json({ message : "success" });
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

module.exports = router;