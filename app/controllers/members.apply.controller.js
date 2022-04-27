const db = require('../models')

const MembersApply = db.membersApply
const Op = db.Sequelize.Op

const membersApply = require("../controllers/members.apply.controller.js");


exports.create = async (req, res) => {
  const member = {
    guildId: req.body.guildId,
    address: req.body.address,
    status: req.body.status || 1 // 0 rejected 1 appling 2 accepted
  }

  // Save Members in the database
  MembersApply.create(member)
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while creating the apply.'
      })
    })
}

exports.findAll = (req, res) => {
  const query = req.query
  // var condition = originOwner ? { originOwner: { [Op.like]: `%${originOwner}%` } } : null;
  const keys = Object.keys(query)
  var queryObj = {}
  keys.forEach((item) => {
    queryObj[item] = {
      [Op.like]: `%${query[item]}%`
    }
  })
  var condition = keys.length ? queryObj : null

  MembersApply.findAll({ where: condition })
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving MembersApply.'
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  MembersApply.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Members was updated successfully.'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot update Members with id=${id}. Maybe Members was not found or req.body is empty!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error updating Members with id=' + id
      })
    })
}
exports.update = (req, res) => {
  const id = req.params.id

  MembersApply.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Members was updated successfully.'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot update Members with id=${id}. Maybe Members was not found or req.body is empty!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error updating Members with id=' + id
      })
    })
}

const deleteById = (id) => {
  return MembersApply.destroy({
    where: { id: id }
  })
} 
exports.delete = (req, res) => {
  const id = req.params.id

  deleteById(id)
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'apply was deleted successfully!'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot delete apply with id=${id}. Maybe Apply was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Could not delete apply with id=' + id
      })
    })
}

exports.deleteAll = (req, res) => {
  MembersApply.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({
        code: 1,
        message: `${nums} apply were deleted successfully!`
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while removing all MembersApply.'
      })
    })
}
