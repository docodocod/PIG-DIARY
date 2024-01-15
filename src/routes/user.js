const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow,unfollow,favorite,favoriteList,aroundMyList } = require('../controllers/user');


const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);

router.delete('/:id/unfollow',isLoggedIn,unfollow);

router.post('/:id/favorite',isLoggedIn,favorite);

router.get("/:id/favoriteList",isLoggedIn,favoriteList);

router.get("/:id/aroundMyList",isLoggedIn,aroundMyList);

module.exports = router;