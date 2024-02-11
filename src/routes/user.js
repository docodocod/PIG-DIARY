const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow,unfollow,addFavorite,removeFavorite,favoriteList,aroundMyList } = require('../controllers/user');


const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);

router.delete('/:id/unfollow',isLoggedIn,unfollow);

router.post('/:id/addFavorite',isLoggedIn,addFavorite);

router.delete('/:id/removeFavorite',isLoggedIn,removeFavorite);

router.get("/:id/favoriteList",isLoggedIn,favoriteList);

router.post("/:id/aroundMyList",isLoggedIn,aroundMyList);

module.exports = router;