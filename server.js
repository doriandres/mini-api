const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const sequelize = new Sequelize('mysql://2CRjPBKxFr:EVpExvvv2T@remotemysql.com:3306/2CRjPBKxFr');

const Pets = sequelize.define('pet', {
  name : { type: Sequelize.STRING, allowNull: false },
  animal : { type: Sequelize.STRING, allowNull: false },
  age : { type: Sequelize.INTEGER, allowNull: false }
});
Pets.sync();

app.use(express.json());
app.get('/api/pets/all', async (req, res) => res.json(await Pets.findAll()));
app.post('/api/pets/create', async (req, res) => res.json(await Pets.create(req.body)));
app.put('/api/pets/update', async (req, res) => res.json({ updated: await Pets.update(req.body, { where: { id: req.body.id } }) }));
app.delete('/api/pets/remove/:id', async (req, res) => res.json({ removed : await Pets.destroy({ where: { id : req.params.id } }) }));
app.listen(process.env.PORT || 8080);