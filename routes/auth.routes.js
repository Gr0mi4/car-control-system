const {Router} = require('express')

const User = require('../models/User')
const router = Router()

router.post('/check', async(req,res) => {
  try {
    const {username} = req.body

    const candidate = await User.findOne({ username })

    if (candidate) {
      res.status(200).json({ message: 'User Found'})
    } else {
      res.status(200).json({ message: 'No such user'})
    }
    // // const hashedPassword = await bcrypt.hash(password, 12)
    // const user = new User({username})
    //
    // await user.save()
    //
    // res.status(201).json({message: "User created"})

  } catch (e) {
    res.status(500).json({message: "Something went wrong"})
  }
})

router.post('/register',async (req,res) => {
  try {
    const {username} = req.body
    // // const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({username})
    //
    await user.save()
    //
    res.status(201).json({message: "User created"})

  } catch (e) {
    console.log(e)
    res.status(500).json({message: "Something went wrong"})
  }})

router.get('/getUser', function (req, res) {
  res.send({username: 'Ivan', birthdate: '01.05.1993', vehicles: [{name:'Xsara VTS 98', type: 'car'}, {name:'Suziuki GS500E', type: 'motorcycle'}]})
})

module.exports = router
