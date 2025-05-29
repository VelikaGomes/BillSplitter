import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FinalSplit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items = [], tip = 0, tax = 0, persons = [], assignments = {} } = location.state || {};
  const personTotals = Array(persons.length).fill(0);

  items.forEach((item, index) => {
    const assignedTo = assignments[index] || [];
    const share = item.price / assignedTo.length;
    assignedTo.forEach(personIndex => {
      personTotals[personIndex] += share;
    });
  });

  const subtotal = personTotals.reduce((a, b) => a + b, 0);
  const totalTipTax = parseFloat(tip) + parseFloat(tax);
  const finalAmounts = personTotals.map(personSubtotal => {
    const percent = personSubtotal / subtotal;
    
    return parseFloat((personSubtotal + percent * totalTipTax).toFixed(2));
  });

  return (
    <div style={{ backgroundColor: '#E1DACA',textAlign: 'center', width: '100%', height: '130vh',padding: '20px', borderStyle:'none' }}>
      <h2>Split Summary</h2>
      <p>Here is how you should split this bill:</p>

      {finalAmounts.map((amount, index) => (
        <div key={index} style={{ margin: 'auto', marginBottom:'15px', width:'300px', backgroundColor: 'white', padding: '10px', borderRadius: '10px',display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
          <div>{persons[index].name || `Person ${index + 1}`}</div> <div style={{ float: 'right' }}>Rs.{amount.toFixed(2)}</div>

        </div>
      ))}

      <button style={{ marginBottom:'10px', backgroundColor: '#CC5500', width: '40%', height: '50px', borderRadius: '10px', color: 'white', fontSize: '15px', padding: '5px', borderStyle: 'none'  }}>
        Share
      </button><br/>
      <button onClick={() => navigate('/')} 
        style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: 'white', width: '40%', height: '50px', }}>
        Back Home
      </button>
    </div>
  );
};

export default FinalSplit;
