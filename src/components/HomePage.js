import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate= useNavigate();
  const handleStart=()=>{
    navigate('/UploadReceipt')
  };
  return (
    <div style={{ backgroundColor:'#E1DACA', textAlign: 'center', width:'100%', height:'100vh', padding:'10px' }}>
      <h1>Scan. Tap. Split.</h1>
      <p>Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.</p>
      <button style={{ backgroundColor:'#CC5500', width:'50%', height:'50px', borderRadius:'15px',color:'white', fontSize:'15px', padding:'5px' , borderStyle:'none'}}onClick={handleStart}>Scan Receipt</button>
      <br /><br />
      <button style={{ backgroundColor:'white', width:'50%', height:'50px', borderRadius:'15px',color:'black', fontSize:'15px', padding:'5px' , borderStyle:'none'}}>Enter Manually</button>
    </div>
  );
};

export default Home;
