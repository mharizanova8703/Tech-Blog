const router = require('express').Router()
const { User } = require('../../models')

//any route in here already has a /api/user infront of it

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    })

    req.session.save(() => {
      req.session.userId = newUser.id
      req.session.username = newUser.username
      req.session.loggedIn = true

      res.json(newUser)
    })

    console.log('NEW USER SAVED TO DB', newUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

//router.post("/login",)
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    //verify user
    if (!dbUserData) {
      res.status(400).json({ message: 'Username not Found' })
      return
    }
    // in your login post here reference the User model and findOne( where: {username: req.body.username})
    const validPassword = dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password' })
      return
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      req.session.loggedIn = true
      res.json({ user: dbUserData, message: 'You are now logged in!' })
    })
  })
})
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
});
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router
