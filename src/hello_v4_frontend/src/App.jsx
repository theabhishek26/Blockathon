// App.js

import React, { useState } from 'react';
// import {ethers} from "ethers";
import './index.scss';
// import { hello_worlf_backend } from 'declarations/hello_worlf_backend';

function App() {
  
  // const getweb3state= async()=>{
  //   let[contractInstance,selectedAccount,chainId]=[null,null,null,null];
  //   if(window.ethereum){
  //     throw new Error("Metamask is not instal")
  //     // try{
  //     //   const acount=await window.ethereum.request({
  //     //     method:"eth_requestAccounts",
  //     //   });
  //     // }
  //     // catch(error){
  //     //   console.log("errror")
  //     // }
  //   }
  //   const accounts=await window.ethereum.request({
  //     method:'eth_requestAccounts'
  //   });
    
  //   let chainIdHex=await window.ethereum.request({
  //     method:'eth_chainId'
  //   });
  //   chainId=parseInt(chainIdHex,16);
  //   selectedAccount=accounts[0];
  //   const provider=ethers.BrowserProvider(window.ethereum);
  //   const signer=await  provider.getSigner();
  //   contractInstance=new ethers.Contract(contractAddress,abi,signer);
  //   return {contractInstance,chainId,selectedAccount};
  // }
  const [account, setAccount] = useState('');
  const [ethereumData, setEthereumData] = useState([]);
  const [bscData, setBscData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeb3Journey = async () => {
    setLoading(true);
    setError('');

    try {
      const ethData = await fetchDataFromEthereum(account); // Changed variable name to avoid shadowing
      const bscData = await fetchDataFromBSC(account); // Changed variable name to avoid shadowing
      setEthereumData(ethData); // Changed variable name
      setBscData(bscData); // Changed variable name
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromEthereum = async (account) => {
    // Simulate fetching data from Ethereum
    // Replace this with actual API call to Ethereum network
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    return [
      { transactionHash: '0x123...', action: 'Sent ETH' },
      { transactionHash: '0x456...', action: 'Received ERC20 Tokens' },
      // Add more data if needed
    ];
  };

  const fetchDataFromBSC = async (account) => {
    // Simulate fetching data from Binance Smart Chain
    // Replace this with actual API call to Binance Smart Chain network
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    return [
      { transactionHash: '0x789...', action: 'Swapped Tokens' },
      // Add more data if needed
    ];
  };

  return (
    <div className="App">
      <div className='Form'>
        <h1 className='title large t' style={{ textAlign: 'center' }}>Web3 Journey</h1>
        <div>
          <label htmlFor="account" className='title'>Enter Account Address:</label><br />
          <input
            type="text"
            id="account"
            value={account}
            className='input'
            onChange={(e) => setAccount(e.target.value)}
            placeholder=" E.g., 0x1234..."
          />
          <button className='button' onClick={fetchWeb3Journey} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Journey'}
          </button>
        </div>

        {error && <p>{error}</p>}

        <div>
          <h2 className='title'>Ethereum Transactions:</h2>
          <ul>
            {ethereumData.map((item, index) => (
              <li key={index} style={{ color: item.action === 'Sent ETH' ? 'green' : 'red' }}>{item.action} (Tx: {item.transactionHash})</li>
            ))}
          </ul>
        </div>
        

        <div>
          <h2 className='title'>Smart Chain Transactions:</h2>
          <ul>
            {bscData.map((item, index) => (
              <li key={index} style={{ color: item.action === 'Swapped Tokens' ? 'orange' : 'green' }}>{item.action} (Tx: {item.transactionHash})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
