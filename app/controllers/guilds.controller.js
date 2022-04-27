const db = require('../models')

const Guilds = db.guilds
const Members = db.members
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  const condition = {
    founderAddress: req.body.founderAddress
  }

  const findedGuild = await findAll(condition)
  console.log('finded guild:' + findedGuild);

  if (findedGuild && findedGuild.length > 0) {
    res.status(200).send({
      code: 0,
      message: 'Each user can only create one guild.'
    })
    return
  }

  const guild = {
    name: req.body.name,
    description: req.body.description,
    subtitle: req.body.subtitle,
    founderAddress: req.body.founderAddress,
    founderEmail: req.body.founderEmail,
    level: req.body.level || 0,
    members: req.body.members || 1,
    membership: req.body.membership,
    rating: req.body.rating || 0
  }

  // Save Guilds in the database
  Guilds.create(guild)
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
      const member = {
        name: req.body.nickname,
        guildId: data.id,
        address: req.body.founderAddress,
        rank: 0, // 0 founder/leader   1 co-founder   2 officer   3 sr.member  4 member
        joinDate: new Date(),
        contribute: 88888,
        rating: 99887
      }
      console.log(member);
      Members.create(member)
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while creating the Guild.'
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
  findAll(condition)
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving Guilds.'
      })
    })
}

const findAll = (condition, limit) => {
  const _condition = limit ? {
    where: condition,
    limit: limit
  } :
    {
      where: condition
    }
  return Guilds.findAll(_condition)
}

exports.findByName = (req, res) => {
  const name = req.params.name
  Guilds.findAll({
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
        message: err.message || 'Some error occurred while retrieving Guilds.'
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  Guilds.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Guilds was updated successfully.'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot update Guilds with id=${id}. Maybe Guilds was not found or req.body is empty!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error updating Guilds with id=' + id
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  // Members.delete

  Guilds.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Guild was deleted successfully!'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot delete Guild with GuildsId=${GuildsId}. Maybe Guilds was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Could not delete Guilds with GuildsId=' + GuildsId
      })
    })
}
exports.deleteByFounder = (req, res) => {
  const address = req.body.address

  Guilds.destroy({
    where: { founderAddress: address }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Guilds was deleted successfully!'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot delete Guilds with GuildsId=${GuildsId}. Maybe Guilds was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Could not delete Guilds with GuildsId=' + GuildsId
      })
    })
}

exports.deleteAll = (req, res) => {
  Guilds.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({
        code: 1,
        message: `${nums} Guildss were deleted successfully!`
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while removing all Guilds.'
      })
    })
}

exports.countMembers = async (req, res) => {
  const { amount } = req.query
  const { id } = req.params

  if (!Number(amount)) {
    res.status(500).send({
      code: 0,
      message: 'Please enter a valid integer number'
    })
    return
  }

  const condition = { id: id }
  const findedGuild = await findAll(condition, 1)
  console.log(findedGuild);

  const _amount = findedGuild[0].members + Number(amount)
  Guilds.update({
    members: _amount
  }, { where: condition }).then((nums) => {
    res.send({
      code: 1,
      message: `Members successfully!`
    })
  })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred'
      })
    })
}
