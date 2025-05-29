import React, { useState } from 'react';
import HomePage from './components/HomePage';
import UploadReceipt from './components/UploadReceipt';
import Receipts from './components/Receipts.js';
import AddPersons from './components/AddPersons';
import FinalSplit from './components/FinalSplit.js';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [receiptData, setReceiptData] = useState([]); 
  const navigate= useNavigate();
  const handleContinue=()=>{
    navigate('/AddPersons');
  };
  return (
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/UploadReceipt" element={<UploadReceipt onParsed={(data)=> setReceiptData(data)}/>}/>
        <Route path="/Receipts" element={<Receipts receiptData={receiptData} onContinue={handleContinue}/>}/>
        <Route path="/AddPersons" element={<AddPersons billItems={receiptData}/>}/>
        <Route path="/FinalSplit" element={<FinalSplit/>}/>
      </Routes>
  );
}


export default App;
