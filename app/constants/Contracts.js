const Web3 = require('web3');
const greeterAbi = require('./Abis/Greeter.json')
const gamelandAbi = require('./Abis/GameLand.json')
const nftAbi = require('./Abis/MyNft.json')

const web3 = new Web3("http://localhost:8545");
const GreeterContract = new web3.eth.Contract(greeterAbi, process.env.GREETER)
const GameLandContract = new web3.eth.Contract(gamelandAbi, process.env.GAMELAND)
const MyNftContract = new web3.eth.Contract(nftAbi, process.env.MYNFT)

const W3 = {}

// const init =async() => { 
//   // const setGreeter = await Greeter.methods.setGreeting("TEst").call()
//   const test = await GameLand.methods.get_testnft().call()
//   console.log(test)
// }

// W3.init = init
W3.contracts = {
  GreeterContract,
  GameLandContract,
  MyNftContract
}

module.exports = W3