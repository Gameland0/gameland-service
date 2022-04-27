const axios = require('axios')
const querystring = require('querystring')
const db = require('../models')
const Contracts = db.contracts
const Opensea = db.opensea
const Utils = require('../utils')
const utils = new Utils()

const baseUrl = 'https://rinkeby-api.opensea.io/api/v1'
const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

// Retrieve NFTs which added in gameland from nftports
exports.getAll = async (req, res) => {
  // const query = req.query
  // const queryStr = querystring.stringify(query)
  // // let addresses = ''
  // let url = `${baseUrl}/assets?asset_contract_address=0xf2d47bbb40f9ffa447687b4708076f6ee3e9134c&${queryStr}`

  // query multi nft contracts
  // try {
  //   // Retrieve nft contract addresses which already deployed in gameland
  //   const data = await Contracts.findAll()
  //   const added = data.map((item) => {
  //     return `asset_contract_addresses=${item.address}`
  //   })
  //   if (added.length > 0) {
  //     addresses = added.join('&')
  //     url += `?${addresses}&${queryStr}`
  //   } else {
  //     url += `?${queryStr}`
  //   }
  // } catch (err) {
  //   res.status(500).send({
  //     code: 0,
  //     message: err.message || 'Some error occurred while retrieving nfts.'
  //   })
  // }

  Opensea.findAll()
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving nft.'
      })
    })
  // http
  //   .get(url)
  //   .then(async (response) => {
  //     const { status, data } = response
  //     if (status === 200) {
  //       const {assets} = data
  //       const debts = await Opensea.findAll()
  //       const result = debts.length ? assets.map(item =>{
  //         const contractAddress = item.asset_contract.address
  //         const tokenId = item.token_id
  //         const match = debts.find(debt => {
  //           return debt.nftId === tokenId && debt.contractAddress === contractAddress
  //         })
  //         return Object.assign(item, match.dataValues)
  //       }) : assets

  //       res.send({
  //         code: 1,
  //         data: result
  //       })
  //     } else {
  //       res.status(500).send({
  //         code: 0,
  //         message: 'Some error occurred while retrieving nfts.'
  //       })
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       code: 0,
  //       message: err.message || 'Some error occurred while retrieving nfts.'
  //     })
  //   })
}

// Retrieve NFT details
exports.details = (req, res) => {
  const query = req.query
  // const queryStr = querystring.stringify(query)
  const contractAddress = req.params.address
  const nftId = req.params.nftId
  const url = `${baseUrl}/asset/${contractAddress}/${nftId}`

  http
    .get(url)
    .then((response) => {
      const { status, data } = response
      console.log(status, data, url)
      if (status === 200 && data.response === 'OK') {
        res.send({
          code: 1,
          data: data
        })
      } else {
        res.status(500).send({
          code: 0,
          message: 'Some error occurred while retrieving nft.'
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving nft.'
      })
    })
}

// Retrieve contract NFTs
exports.contracts = (req, res) => {
  const query = req.query
  const queryStr = querystring.stringify(query)
  const contractAddress = req.params.address
  const url = `${baseUrl}/nfts/${contractAddress}?${queryStr}`

  http
    .get(url)
    .then((response) => {
      const { status, data } = response

      if (status === 200 && data.response === 'OK') {
        res.send({
          code: 1,
          data: data.nfts
        })
      } else {
        res.status(500).send({
          code: 0,
          message: data.detail || data.error || 'Some error occurred while retrieving nfts.'
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.response.data.detail || err.message || 'Some error occurred while retrieving nfts.'
      })
    })
}

// Retrieve NFTs owned by an account
exports.account = (req, res) => {
  const query = req.query
  const queryStr = querystring.stringify(query)
  const account = req.params.account
  const url = `${baseUrl}/accounts/${account}?${queryStr}`

  http
    .get(url)
    .then((response) => {
      const { status, data } = response

      if (status === 200 && data.response === 'OK') {
        res.send({
          code: 1,
          data: data.nfts
        })
      } else {
        res.status(500).send({
          code: 0,
          message: data.detail || data.error || 'Some error occurred while retrieving nfts.'
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.response.data.detail || err.message || 'Some error occurred while retrieving nfts.'
      })
    })
}

// stored lending nft
exports.insert = (req, res) => {
  try {
    const nft = {
      nftId: req.body.nftId,
      name: req.body.name,
      img: req.body.img,
      isLending: true,
      isBorrowed: req.body.isBorrowed || false,
      withdrawable: req.body.withdrawable || false,
      isExpired: req.body.isExpired || false,
      price: req.body.isBorrowed || 0,
      days: req.body.days || 0,
      collateral: req.body.collateral || 0,
      borrower: req.body.borrower,
      borrowAt: req.body.borrowAt,
      owner: req.body.owner || '0x0000000000000000000000000000000000000000',
      originOwner: req.body.originOwner || '0x0000000000000000000000000000000000000000',
      contractAddress: req.body.contractAddress || ''
    }

    Opensea.findOne({
      where: {
        nftId: req.body.nftId
      }
    }).then((data) => {
      console.log(data)
      if (data.length) {
      }
    })

    // Save Nft in the database
    Opensea.create(nft)
      .then((data) => {
        res.send({
          code: 1,
          data: data
        })
      })
      .catch((err) => {
        res.status(500).send({
          code: 0,
          message: err.message || 'Some error occurred while deposit the Nft.'
        })
      })
  } catch (error) { }
}
const retrieveAssets = async () => {
  let assets = []
  let defaultOffset = 0
  const addedContracts = {}

  // get contracts
  const contractsData = await Contracts.findAll()
  contractsData.forEach((item) => {
    const key = item.address.toLowerCase()
    addedContracts[key] = item.id
  })

  const retrieveFN = async (offset, limit) => {
    // return new Promise(async (resolve, reject) => {

      let addresses = ''
      let url = `${baseUrl}/assets`
      const queryStr = `&offset=${offset}&limit=${limit}`

      // Retrieve nft contract addresses which already deployed in gameland
      try {

        const added = contractsData.map((item) => {
          return `asset_contract_addresses=${item.address}`
        })
        if (added.length > 0) {
          addresses = added.join('&')
          url += `?${addresses}&${queryStr}`
        } else {
          url += `?${queryStr}`
        }

        const response = await http.get(url)
        const { status, data } = response
        console.log(response.config.url)
        if (status === 200) {
          assets = assets.concat([], data.assets.map((item) => {
            const gamelandNftId = utils.fixDigitalId(addedContracts[item.asset_contract.address.toLowerCase()], Number(item.token_id), 4)
            return {
              nftId: item.token_id,
              isLending: false,
              isBorrowed: false,
              withdrawable: false,
              isExpired: false,
              price: 0,
              days: 0,
              collateral: 0,
              borrower: '',
              borrowAt: new Date(),
              contractAddress: item.asset_contract.address,
              originOwner: item.owner.address,
              gamelandNftId: gamelandNftId,
              standard: item.asset_contract.schema_name
            }
          }))
          console.log(assets.length,data.assets.length);
          if (data.assets.length === limit) {
            defaultOffset += limit
            await retrieveFN(defaultOffset, limit)
         
          }
        }
      } catch (error) {
        // reject(new Error(error))
        console.log(error);
      }
    // })
  }
  await retrieveFN(defaultOffset, 50)
  return assets
}
// Retrieve NFTs which added in gameland from nftports
exports.init = async (req, res) => {
  const query = req.query
  const queryStr = querystring.stringify(query)
  try {
    const assets = await retrieveAssets()
    console.log(assets.length);
    res.send({
      code: 1,
      data: assets
    })
    Opensea.bulkCreate(assets)
      .then((bulkRes) => {
        res.send({
          code: 1,
          data: assets
        })
      })
      .catch((err) => {
        res.status(500).send({
          code: 0,
          message: err.message || 'Some error occurred while inited opensea assets.'
        })
      })
  } catch (err) {
    res.status(500).send({
      code: 0,
      message: err.message || 'Some error occurred while retrieving opensea assets.'
    })
  }
}


// Update a debt by the id
exports.update = (req, res) => {
  const gamelandNftId = req.params.gamelandNftId

  Opensea.update(req.body, {
    where: { gamelandNftId: gamelandNftId }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Nft was updated successfully.'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot update Nft with id=${id}. Maybe Nft was not found or req.body is empty!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error updating Nft with id=' + id
      })
    })
}