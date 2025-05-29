import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadReceipt = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const uploadReceipt=(e)=> {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>  {
        const result=reader.result;
        if(typeof result==='string' && result.includes(',')){
            resolve(result.split(',')[1]);
        }else{ reject('invalid');
        }
      };
      reader.onerror = (error) => reject(error);
    });
    const parseBillText = (text) => {
    const lines = text.split('\n');
    return lines
      .map((line) => {
        const match = line.match(/(.+?)\s*[-:\s]*\s*(?:₹|Rs\.?|INR)?\s*(\d+(?:\.\d{1,2})?)\s*$/i);
        if (match) {
          return {
            item: match[1].trim(),
            price: match[2].trim()
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const readReceipt=async()=> {
    if (!image) {
      setError('Please upload a receipt image first.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const base64 = await convertToBase64(image);
     const response = await axios.post(
  'https://api.together.xyz/v1/chat/completions',
  {
    model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Extract each item and its price from this receipt. Return them in the format: "Item Name - ₹Price", each on a new line.' },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64}`
            }
          }
        ]
      }
    ]
  },

        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOGETHER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);
      const rawText = response.data.choices?.[0]?.message?.content || '';

      const parsedItems = parseBillText(rawText);

    
      if (parsedItems.length === 0) {
        setError('No items found in receipt. Please try a clearer image.');
      } else {
        navigate('/receipts', { state: { receiptData: parsedItems } });


      }
    } catch (err) {
      setError('Failed to read receipt.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor:'#E1DACA', width:'100%', height:'100%', padding:'20px' }}>
      <div style={{ borderRadius: '10px', borderColor: 'white', borderStyle: 'solid', borderWidth:'10px', width:'70%', height:'800px', margin: 'auto' }}>
        <div style={{ borderRadius: '10px' }}>
          <h2>Scan Receipt</h2>
          <input type="file" accept="image/*" onChange={uploadReceipt} />
          {preview && <img src={preview} alt="receipt" width="300" style={{ padding: '30px' }} />}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
      <br /> <br />
      <button style={{ backgroundColor: '#CC5500', width: '50%', height: '50px', borderRadius: '15px', color: 'white', fontSize: '15px', padding: '5px', borderStyle: 'none' }}onClick={readReceipt} disabled={loading}>
        {loading ? 'Reading...' : 'Scrape the Bill'}
      </button>
    </div>
  );
};

export default UploadReceipt;
