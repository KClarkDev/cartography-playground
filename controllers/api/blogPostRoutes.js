const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all blog posts
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
      ],
    });

    console.log(blogData);

    // Serialize data so the template can read it
    const blogPosts = blogData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into the homepage template
    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE (PUT) a blog post
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    const [affectedRows] = await BlogPost.update(updatedData, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
