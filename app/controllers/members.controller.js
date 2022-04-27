const db = require('../models')

const Members = db.members
const Guilds = db.guilds
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  const member = {
    name: req.body.name,
    guildId: req.body.guildId,
    address: req.body.address,
    rank: req.body.rank,
    joinDate: req.body.joinDate,
    contribute: req.body.contribute,
    rating: req.body.rating
  }

  // Save Members in the database
  Members.create(member)
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while creating the Members.'
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

  Members.findAll({ where: condition })
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving Members.'
      })
    })
}

exports.findOne = (req, res) => {
  const name = req.params.name
  Members.findAll({
    where: {
      name: name
    },
    limit: 1
  })
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving Members.'
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  Members.update(req.body, {
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

exports.delete = (req, res) => {
  const id = req.params.id

  Members.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Members was deleted successfully!'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot delete Members with MembersId=${MembersId}. Maybe Members was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Could not delete Members with MembersId=' + MembersId
      })
    })
}

exports.deleteAll = (req, res) => {
  Members.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({
        code: 1,
        message: `${nums} Memberss were deleted successfully!`
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while removing all Members.'
      })
    })
}
