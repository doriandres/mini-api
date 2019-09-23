const express = require('express');
const Sequelize = require('sequelize');
const app = express();
app.use(express.json());
const sequelize = new Sequelize('mysql://2CRjPBKxFr:EVpExvvv2T@remotemysql.com:3306/2CRjPBKxFr');

const User = sequelize.define('user', {
  name : { type: Sequelize.STRING, allowNull: false },
  lastName : { type: Sequelize.STRING, allowNull: false }
});
User.sync();

app.post('/save/user', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get('/users', async (req, res) => {
  const users =  await User.findAll();
  res.json(users);
})

app.delete('/user/:id', async (req, res) => {
  const done =  await User.destroy({ where: { id : req.params.id } });
  res.json({ done });
})


app.listen(process.env.PORT || 8080);