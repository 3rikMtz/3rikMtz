const typeDefs = `
    type Portfolio {
        _id: ID
        postTitle: String
        postContent: String
        createdAt: String
        comments: String
        userID(_id: ID!): User
    }

    type Bulletin {
        _id: ID
        bulletPostTitle: String
        bulletText: String
        serviceOffer: [Service]
        serviceNeed: [Service]
        deliveryTime: String
        imageURL: String
        createdAt: String
        userID: User
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        age: Int
        occupation: String
        location: String
        rating: Int
        aboutMe: String
        github: String
        artStation: String
        skills(_id: ID!): Skill
        bulletinPosts(_id: ID!): [Bulletin]
        portfolioPosts(_id: ID!): [Portfolio]
        profileImage: String
    }

    type Skill {
        _id: ID
        skillTitle: String
        userID(_id: ID!): User
    }

    type Service {
        _id: ID
        serviceTitle: String
        serviceDescription: String
        userID(_id: ID!): User
        skillID(_id: ID!): Skill
    }

    type Auth {
        token: ID!
        user: User
    }

    type VerificationResult {
        success: Boolean!
        message: String!
    }

    type Query {
        portfolioPosts: [Portfolio]
        bulletinPosts: [Bulletin]
        users: [User]
        getProfileImg(id: ID!): User
        skills: [Skill]
        services: [Service]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateProfileImg(id: ID!, profileImage: String!): User
        updateUser(_id: ID!, aboutMe: String, location: String, occupation: String, age: String, username: String): User
        addBBPost(
            bulletPostTitle: String!,
            bulletText: String!,
            serviceOffer: [ID],
            serviceNeed: [ID],
            deliveryTime: String,
            imageURL: String,
            createdAt: String,
            userID: ID!
        ): Bulletin
        requestUserVerification(userId: ID!): VerificationResult
        verifyUser(token: String!): VerificationResult
        addPortfolio(postTitle: String!, postContent: String!, userID: ID!): Portfolio
        addSkill(skillTitle: String!, userID: ID!): Skill
        addService(serviceTitle: String!, serviceDescription: String!, userID: ID!, skillID: ID!): Service
    }
`;

module.exports = typeDefs;


// this is what chat GPT says service should be; 
// type Service {
//     _id: ID
//     serviceTitle: String
//     serviceDescription: String
//     userID: User
//     skillID(_id: ID!): Skill
//   }