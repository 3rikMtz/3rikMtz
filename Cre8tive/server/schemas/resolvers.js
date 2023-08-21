const { AuthenticationError } = require('apollo-server-express');
const { Portfolio, User, UserVerification, Bulletin, Skill, Service } = require("../models");
const { signToken, generateVerificationToken, sendVerificationEmail } = require("../utils/auth");

const resolvers = {
  Bulletin: {
    userID: async (parent) => {
      const user = await User.findById(parent.userID);
      return user;
    },
  },
  User: {
    bulletinPosts: async (parent) => {
      const bulletins = await Bulletin.find({ userID: parent._id });
      return bulletins;
    },
  },

  Query: {
    portfolioPosts: async () => {
      return Portfolio.find();
    },
    users: async () => {
      return User.find();
    },
    getProfileImg: async (parent, args) => {
      try {
        const user = await User.findById(args.id);
        return user;
      } catch (error) {
        throw new Error('Error fetching profile image');
      }
    },
    bulletinPosts: async () => {
      return await Bulletin.find();
    },
    skills: async () => {
      return Skill.find();
    },
    services: async () => {
      return Service.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password, verified: false });

      // Generate a verification token and send a verification email
      const verificationToken = generateVerificationToken(user);
      await sendVerificationEmail(email, verificationToken);

      return { success: true, message: "User registered successfully. Please check your email for verification." };
    },

    requestUserVerification: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new AuthenticationError("User not found");
        }

        const verificationToken = generateVerificationToken(user);
        await sendVerificationEmail(user.email, verificationToken);

        return { success: true, message: "Verification email sent successfully." };
      } catch (error) {
        throw new Error('Failed to request user verification');
      }
    },

    verifyUser: async (parent, { token }) => {
      try {
        const verifiedUserId = UserVerification.verifyToken(token);
        if (!verifiedUserId) {
          throw new AuthenticationError("Invalid verification token");
        }

        const user = await User.findById(verifiedUserId);
        if (!user) {
          throw new AuthenticationError("User not found");
        }

        user.verified = true;
        await user.save();

        await UserVerification.deleteToken(token);

        return { success: true, message: "User verified successfully." };
      } catch (error) {
        throw new Error('Failed to verify user');
      }
    },

    addBBPost: async (parent, args) => {
      try {
        const newPost = await Bulletin.create(args);
        return newPost;
      } catch (error) {
        throw new Error('Failed to create bulletin');
      }
    },

    addPortfolio: async (parent, args) => {
      try {
        const newPortfolio = await Portfolio.create(args);
        return newPortfolio;
      } catch (error) {
        throw new Error('Failed to create portfolio');
      }
    },

    addSkill: async (parent, args) => {
      try {
        const newSkill = await Skill.create(args);
        return newSkill;
      } catch (error) {
        throw new Error('Failed to create skill');
      }
    },

    addService: async (parent, args) => {
      try {
        const newService = await Service.create(args);
        return newService;
      } catch (error) {
        throw new Error('Failed to create service');
      }
    },

    // ... Other mutation functions ...
  },
};

module.exports = resolvers;

