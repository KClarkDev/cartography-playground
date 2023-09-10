const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a new comment
router.post('/', withAuth, async (req, res) => {
  console.log('Within router.post');
  try {
    console.log(req.body);

    const newComment = await Comment.create({
      ...req.body, // includes the comment text and the post-id that the comment belongs to
      userId: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
