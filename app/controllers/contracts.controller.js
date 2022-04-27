const db = require('../models')
const Contract = db.contracts
// const Contracts = db.contracts
const Op = db.Sequelize.Op
// const Web3 = require('../constants/Contracts')
// const gamelandContract = Web3.GameLandContract

// Create and Save a new contract record
exports.create = async (req, res) => {
  const {name, address} = req.body

  // Validate request
  if (!address) {
    res.status(400).send({
      message: 'contract address can not be empty!'

    })
    return
  }

  // add a Contract
  const contract = {
    name: name,
    address: address
  }

  // Save Contract in the database
  Contract.create(contract)
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while creating the Contract.'

      })
    })
}

// Retrieve all Contracts from the database.

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

  Contract.findAll({ where: condition })
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving contract.'
      })
    })
}

// Update a Contract by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Contract.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Contract was updated successfully.'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot update Contract with id=${id}. Maybe Contract was not found or req.body is empty!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error updating Contract with id=' + id
      })
    })
}

// Delete a Contract with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Contract.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Contract was deleted successfully!'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot delete Contract with id=${id}. Maybe Contract was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Could not delete Contract with id=' + id
      })
    })
}

