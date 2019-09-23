const express = require('express'); // Import express
const Sequelize = require('sequelize'); // Import Sequelize

const app = express(); // Create server instance
app.use(express.json()); // Ask the server to parse request bodies as json data

/**
 * Database connection object
 * Use the connection string to initialize it
 */
const sequelize = new Sequelize('mysql://2CRjPBKxFr:EVpExvvv2T@remotemysql.com:3306/2CRjPBKxFr');

/**
 * Table users definition
 */
const User = sequelize.define('user', {
  /**
   * Column: name
   * Data type: String
   * Not null
   */
  name : { type: Sequelize.STRING, allowNull: false },

  /**
   * Column: lastName
   * Data type: String
   * Not null
   */
  lastName : { type: Sequelize.STRING, allowNull: false }
});
User.sync(); // Asks the database to create or sync the table information

/**
 * Insert an user endpoint
 * Method: POST 
 * Path: "/user"
 */
app.post('/user', async (req, res) => {
  /**
   * "req" is an object that has the information of the request
   * it has a property "body" which contains the json data as an object
   * 
   * We ask the table model "User" to create an entity with the information
   * of the json received through the request body
   * 
   * This operation is async so is good to call it from an asyn function
   * and to use await to wait for it to be finished
   * 
   * The record created in the database will be returned and stored in
   * the variable "user"
   * 
   * Finally send the "user" object as a json using the "res" object
   * as response of the request.
   */
  const user = await User.create(req.body);
  res.json(user);
});

/**
 * Select users endpoint
 * Method: GET
 * Path: "/users"
 */
app.get('/users', async (req, res) => {
  const users =  await User.findAll();
  res.json(users);
});

/**
 * Delete user endpoint
 * Method: DELETE
 * Path: "/user/#"
 */
app.delete('/user/:id', async (req, res) => {
  const changes =  await User.destroy({ where: { id : req.params.id } });
  res.json({ changes });
});


/**
 * Update user endpoint
 * Method: PUT
 * Path: "/user"
 */
app.put('/user', async (req, res) => {
  const changes = await User.update(req.body, { where: { id: req.body.id } });
  res.json({ changes });
});


/**
 * Put the server to listen for request 
 * Use process.env.PORT for using port available in the cloud server
 * for local usage use 8080
 */
app.listen(process.env.PORT || 8080);