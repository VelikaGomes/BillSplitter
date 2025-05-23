import React, { useState } from 'react';
import HomePage from './components/HomePage';
import UploadReceipt from './components/UploadReceipt';
import Receipts from './components/Receipts.js';
import AddPersons from './components/AddPersons';

function App() {
  const [step, setStep] = useState(1);
  const [receiptData, setReceiptData] = useState([]); 
  return (
    <div>
      {step === 1 && ( <HomePage onStart={() => setStep(2)} />
      )}
      {step === 2 && (
        <UploadReceipt
          onNext={(data) => {setReceiptData(data);setStep(3); }} onBack={() => setStep(1)}/>
      )}

      {step === 3 && (
        <Receipts receiptData={receiptData} onNext={(updatedItems) => { setReceiptData(updatedItems); setStep(4); }} onBack={() => setStep(2)}/>
      )}

      {step === 4 && (
        <AddPersons billItems={receiptData} onBack={() => setStep(3)} />
      )}
    </div>
  );
}

export default App;
