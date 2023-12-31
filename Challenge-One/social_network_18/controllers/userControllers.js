const { User } = require('../models');

module.exports = {
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //post a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //delete a user by its ID
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ); 
      
      if (!userData) {
        return res.status(404).json({ message: 'No user with this ID' });
      }
  
      res.json(userData);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    }
  },
  //delete friend 
  async removeFriend(req, res) {
    try {
         
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ); 

      if (!userData) {
        return res.status(404).json({ message: 'No user with that ID'}); 
      }
      res.json({ message: 'Friend deleted successfully', userData });
    } catch (err) {
      console.log(err); 
      res.status(500).json(err); 
    }
  },
};
