const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Departments} = require('../models/departments');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin] ,async (req, res) => {
  const department = await Departments.find().sort('name');
  res.send(department);
});

router.post('/', async (req, res) => {
  let department = new Departments({ name: req.body.name });
  department = await department.save();
  res.send(department);
});

router.put('/:id', async (req, res) => {
  const departments = await Departments.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });
  if (!departments) return res.status(404).send('The department with the given ID was not found.');
  res.send(departments);
});

router.delete('/:id', async (req, res) => {
  const departments = await Departments.findByIdAndRemove(req.params.id);

  if (!departments) return res.status(404).send('The departments with the given ID was not found.');

  res.send(departments);
});

router.get('/:id', async (req, res) => {
  const departments = await Departments.findById(req.params.id);

  if (!departments) return res.status(404).send('The departments with the given ID was not found.');

  res.send(departments);
});

module.exports = router;