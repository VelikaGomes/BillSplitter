import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Receipts=()=>{
  const location=useLocation();
  const receiptData=location.state?.receiptData || [];
  const [items, setItems] =useState(receiptData);
  const [tip, setTip] =useState(0);
  const navigate=useNavigate();
  const [tax, setTax] =useState(0);

  const handleItemChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { item: '', price: 0 }]);
  const removeItem=(index) => setItems(items.filter((_, i) => i !== index));

  const total=items.reduce((sum, item) => sum+parseFloat(item.price ||0),0)+parseFloat(tip || 0) + parseFloat(tax || 0);
  return (
    <div style={{ backgroundColor:'#E1DACA', textAlign: 'center', width:'100%', height:'700vh', padding:'20px'  }}>
      <h2>Receipt Items</h2>
      <p>List all the items on your receipt</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       {items.map((item, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center', width: '100%', justifyContent: 'center', maxWidth: '600px' }}>
        <input type="text" value={item.item} onChange={(e) => handleItemChange(index, 'item', e.target.value)} placeholder="Item name"
         style={{ flex: 1, padding: '10px', borderRadius: '10px', borderStyle: 'none', maxWidth: '250px' }}/>
         
        <input type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} placeholder="Price"
         style={{ width: '80px', padding: '8px', borderRadius: '6px', borderStyle: 'none' }}/>
         <button onClick={() => removeItem(index)} style={{ background: 'none', border: 'none', color: 'black' }}>
          Remove</button>
      </div>
    ))}
</div>
      <button onClick={addItem} style={{ marginTop: '10px', padding: '8px', borderRadius: '6px', backgroundColor:'#E8E9EB', borderStyle:'none' }}>+ Add Item</button>
        <div style={{ marginTop: '20px' }}>
          <label> Tip: Rs.
           <input type="number" value={tip} onChange={(e) => setTip(e.target.value)}
            style={{ margin: '5px', padding: '5px', borderStyle:'none' }}/>
          </label>
         </div>
         <div style={{ marginTop: '10px' }}>
          <label>Tax: Rs.
           <input type="number" value={tax} onChange={(e) => setTax(e.target.value)}
            style={{ margin: '5px', padding: '5px', borderStyle:'none' }}/>
          </label>
          </div>
         <h3 style={{ marginTop: '20px' }}>Total: Rs. {total.toFixed(2)}</h3>
         <button style={{ backgroundColor: '#CC5500', width: '50%', height: '50px', borderRadius: '15px', color: 'white', fontSize: '15px', padding: '5px', borderStyle: 'none' }}
         onClick={()=>navigate('/AddPersons', {state:{items, tip, tax,total}})}>
           Continue
         </button>
        </div>
  );
};

export default Receipts;
