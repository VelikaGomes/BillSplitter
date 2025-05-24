import React, { useState } from 'react';
import HomePage from './components/HomePage';
import UploadReceipt from './components/UploadReceipt';
import Receipts from './components/Receipts.js';
import AddPersons from './components/AddPersons';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [receiptData, setReceiptData] = useState([]); 
  return (
      <Routes>
        <Route path="/" element={<HomePage />}/>

        <Route path="/UploadReceipt" element={<UploadReceipt onParsed={(data)=> setReceiptData(data)}/>}/>

        <Route path="/Receipts" element={<Receipts/>}/>

        <Route path="/AddPersons" element={<AddPersons billItems={receiptData}/>}/>

      </Routes>
  );
}

export default App;
