import Web3 from 'web3'
import DefileContract from '../abis/DeFile.json'

var selectedAccount
var defileContract
export const init = async () => {
  let provider = window.ethereum
  if (typeof provider !== 'undefined') {
    //MetaMask is installed !
    provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        selectedAccount = accounts[0]
      })
      .catch((err) => {
        console.log(err)
      })
    window.ethereum.on('accountsChanged', (accounts) => {
      selectedAccount = accounts[0]
    })
  }
  const web3 = new Web3(provider)
  const networkId = await web3.eth.net.getId()
  const networkData = DefileContract.networks[networkId]
  if (networkData) {
    defileContract = new web3.eth.Contract(
      DefileContract.abi,
      networkData.address,
    )
    return { contract: defileContract, selectedAccount }
  } else {
    window.alert(' Defile contract not deployed to detected network . ')
  }
}
