# Adobe-Social-Media API
This API allows users to create and manage posts, as well as retrieve analytics about user and post activity.

## Table of Contents
<li> User Endpoints </li>
<li> Post Endpoints </li>
<li> Installation </li>
<li> Dependencies </li>

## User Endpoints
```
POST /users: Create a new user.

GET /users/{id}: Retrieve a user by id.

PUT /users/{id}: Update a user's name or bio by id.

DELETE /users/{id}: Delete a user by id.

GET /analytics/users: Retrieve the total number of users.

GET /analytics/users/top-active: Retrieve the top 5 most active users, 
based on the number of posts.
```

## Post Endpoints
```
POST /posts: Create a new post. The request should include the user_id.

GET /posts/{id}: Retrieve a post by id.

PUT /posts/{id}: Update a post's content by id.

DELETE /posts/{id}: Delete a post by id.

POST /posts/{id}/like: Increment the like count of a post by id.

POST /posts/{id}/unlike: Decrement the like count of a post by id. 
The count should not go below 0.

GET /analytics/posts: Retrieve the total number of posts.

GET /analytics/posts/top-liked: Retrieve the top 5 most liked posts.
```

## Installation

To install and run the app, clone the repository and run npm install to install the necessary dependencies. Then, start the server with npm start.

<li> Dependencies </li>
<li> Node.js</li>
<li> Express</li>
<li> Mongoose</li>
<li> Body-parser</li>
<li> Nodemon (for development only)</li>
