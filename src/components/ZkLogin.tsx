import React, { useEffect, useState } from 'react';
import { generateNonce, generateRandomness, getExtendedEphemeralPublicKey, jwtToAddress } from '@mysten/zklogin';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { SuiClient } from '@mysten/sui/client';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const FULLNODE_URL = 'https://fullnode.devnet.sui.io';
const suiClient = new SuiClient({ url: FULLNODE_URL });


const ZkLoginComponent = () => {
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair | null>(null);
  const [nonce, setNonce] = useState('');
  const navigate = useNavigate(); // Call useNavigate inside your component


  useEffect(() => {
    // Generate ephemeral key pair on component mount
    const generateKeyPair = async () => {
      const { epoch } = await suiClient.getLatestSuiSystemState();
      const maxEpoch = Number(epoch) + 2;
      const keyPair = new Ed25519Keypair();
      const randomness = generateRandomness();
      const generatedNonce = generateNonce(keyPair.getPublicKey(), maxEpoch, randomness);

      setEphemeralKeyPair(keyPair);
      setNonce(generatedNonce);
    };

  
      

    generateKeyPair();
  }, []);

  const handleLogin = () => {
    const clientId = '1066149383371-t36mc2moer3ulhsn8djqf8thkaejtcgp.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token&redirect_uri=${redirectUri}&scope=openid&nonce=${nonce}`
    window.location.href = authUrl;
  };

  const idtoken:string = 'id_token'; 
  const handleRedirect = async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1)); // Remove the leading '#' from the hash
    const idToken = hashParams.get('id_token'); 

    if (idToken) {
        console.log('triggered')
      const decodedJwt = jwtDecode(idToken);
      console.log('hello');
      console.log(decodedJwt);

      const userSalt = await getUserSalt(idToken);  // Pass the raw idToken here
      console.log(1);
      const zkLoginUserAddress = jwtToAddress(idToken, userSalt);  // Pass the raw idToken here
      console.log(2);
      
      console.log(zkLoginUserAddress);

      await fetchZKProof(idToken, ephemeralKeyPair);  // Pass the raw idToken here
      navigate('/dashboard');
      
    //   window.location.href = 'http://localhost:3000/dashboard';
    } 
    else {
      window.alert('Could not authenticate you. Try again later.');
    }
  };

  const getUserSalt = 
  async function generateSalt(data: string) {
    // Convert input data to string (if it's not already a string)
    const inputData = typeof data === 'string' ? data : JSON.stringify(data);
  
    // Hash the input data using SHA-256
    const hashBuffer = new TextEncoder().encode(inputData);
    const digestBuffer = await crypto.subtle.digest('SHA-256', hashBuffer);
  
    // Convert the hash into a Uint8Array
    const digestArray = new Uint8Array(digestBuffer);
  
    // We need a 16-byte salt (smaller than 2^128)
    const saltArray = digestArray.slice(0, 16); // Extract the first 16 bytes
  
    // Convert the 16-byte array into a hex string
    const saltHex = Array.from(saltArray).map(b => b.toString(16).padStart(2, '0')).join('');
  
    // Convert the hex string into a BigInt
    const saltBigInt = BigInt('0x' + saltHex);
  
    // Represent 2^128 as a string for comparison
    const maxVal = BigInt('340282366920938463463374607431768211456'); // 2^128
  
    // Ensure the salt is smaller than 2^128 (should always be true since it's a 16-byte value)
    if (saltBigInt >= maxVal) {
      throw new Error('Generated salt exceeds 2^128 limit');
    }
  
    return saltBigInt;
  }
  



  
//   async (jwt: string) => {
//     const response = await fetch('https://salt.api.mystenlabs.com/get_salt', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: jwt }),
//     });

//     const data = await response.json();
//     return data.salt;
//   };

  const fetchZKProof = async (jwt: string, keyPair: Ed25519Keypair | null) => {
    if (!keyPair) {
      console.error('Ephemeral key pair is not available.');
      return;
    }

    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(keyPair.getPublicKey());

    const response = await fetch('https://prover-dev.mystenlabs.com/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jwt,
        extendedEphemeralPublicKey,
        maxEpoch: '10',
        jwtRandomness: 'YOUR_JWT_RANDOMNESS',
        salt: 'YOUR_SALT',
        keyClaimName: 'sub',
      }),
    });

    const proof = await response.json();
   console.log('fully functional')
    console.log(proof);
  };

  useEffect(() => {
    if (window.location.hash.includes(idtoken)) {
        console.log('it is here')
      handleRedirect();
    }
  }, []);

  return (
    <div>
      <button
       className="bg-white text-purple-900 px-8 py-3 rounded-full text-xl font-semibold hover:bg-purple-100 transition-colors shadow-lg"
      onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default ZkLoginComponent;