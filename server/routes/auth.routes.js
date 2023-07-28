const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();

router.post('/check', async (req, res) => {
  try {
    const { username, password } = req.body;
    const candidate = await User.findOne({ username });

    if (candidate) {
      const isMatch = await bcrypt.compare(password, candidate.password);
      const token = jwt.sign({ id: candidate.id }, 'ivangromov', { expiresIn: '1h' });
      isMatch
        ? res.status(200).json({ message: 'User Found', id: candidate._id, token, username: candidate.username })
        : res.status(403).json({ message: 'Password is incorrect', type: 'password' });
    } else {
      res.status(401).json({ message: 'No such user', statusCode: 401 });
    }

  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, id });
    const token = jwt.sign({ id }, 'ivangromov', { expiresIn: '1h' });

    await user.save();

    res.status(200).json({ message: "User Created", id, token, username });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
