import React, { useState } from 'react';
import HomePage from './components/HomePage';
import UploadReceipt from './components/UploadReceipt';
function App() {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 && <HomePage onStart={() => setStep(2)} />}
      {step ===2 && <UploadReceipt/>}
    </div>
  );
}

export default App;
