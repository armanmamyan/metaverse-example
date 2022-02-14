import abi from '../abi/abi.json';

const connect  = new Promise((resolve, reject) => {
    if(typeof window.ethereum ===  'undefined'){
        reject(new Error('Install Metamask'))
    }

    window.ethereum.request({
        method: 'eth_requestAccounts'
    });

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, "0xBbd78F7193C11033300A494afD4f33C526C1376f");

    web3.eth.getAccounts().then((accounts) => {
        contract.methods
            .totalSupply()
            .call({from: accounts[0]})
            .then(
                (supply)  =>  {
                    contract.methods
                            .getBuildings()
                            .call({from: accounts[0]})
                            .then((buildings)  =>  {
                                resolve({
                                        supply,
                                        buildings
                                    })
                                }
                            )
                }
            )
    })
});



export default connect