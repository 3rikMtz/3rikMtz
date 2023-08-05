const router = require('express').Router();
const { User } = require('../../models');

//route to create a new user 
router.post('/', async (req, res) => {
    try {
        // const { name, email, password } = req.body; 
        const userData = await User.create({ 
          name: req.body.name, email: req.body.email, password: req.body.password });   
          console.log(userData); 

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});


//retrieve all the users in the database 
router.get('/users', async (req, res) => {
    try {
      // Access the user data from the previous route
      const users = await User.findAll();
  
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(400).json({ error: 'Invalid credentials' }); 
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true; 
      req.session.name = userData.name; 
      res.json({ user: userData });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout route 
router.post('/logout', (req, res) => {
  console.log('login out', req.session.logged_in)
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;