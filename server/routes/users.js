const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// _____________________________________________________________________________

router.post('/follow/:userId', authMiddleware, async (req, res) => {
	try {
	  const loggedInUserId = req.user._id;
	  const userToFollowId = req.params.userId;
  
	  await User.findByIdAndUpdate(loggedInUserId, { $addToSet: { following: userToFollowId } });
	  await User.findByIdAndUpdate(userToFollowId, { $addToSet: { followers: loggedInUserId } });
  
	  res.status(200).send({ message: 'Successfully followed user.' });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: 'Internal Server Error' });
	}
  });
  
  router.post('/unfollow/:userId', authMiddleware, async (req, res) => {
	try {
	  const loggedInUserId = req.user._id;
	  const userToUnfollowId = req.params.userId;
  
	  await User.findByIdAndUpdate(loggedInUserId, { $pull: { following: userToUnfollowId } });
	  await User.findByIdAndUpdate(userToUnfollowId, { $pull: { followers: loggedInUserId } });
  
	  res.status(200).send({ message: 'Successfully unfollowed user.' });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: 'Internal Server Error' });
	}
  });

//   router.get('/status/:userId/:bookId', authMiddleware, async (req, res) => {
// 	try {
// 	  const loggedInUserId = req.user._id;
// 	  const bookId = req.params.bookId;
  
// 	  const user = await User.findById(loggedInUserId);
// 	  const isLiked = user.likes.includes(bookId);
// 	  const isFollowing = user.following.includes(bookId);
  
// 	  res.status(200).json({ isLiked, isFollowing });
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send({ message: "Internal Server Error" });
// 	}
//   });
  

module.exports = router;
