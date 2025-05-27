import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const AddPersons = () => {
  const location = useLocation();
  const { items = [], tip = 0, tax = 0, total = 0 } = location.state || {};
  const [persons, setPersons] = useState([{ name: "" }]);

  return (
    <div
      style={{ backgroundColor: "#E1DACA", textAlign: "center", width: "100%", minHeight: "100vh", padding: "20px",}}>
      <h2>Add People</h2>
      <p>Type all the names and assign the items</p>

      <div>
        <div>
          <h3>Assigned Items</h3>
          <button style={{  backgroundColor: "#F1EFE9",padding: "8px 16px",marginTop: "10px", borderRadius: "6px", border: "1px solid #ccc", }}>
            Split evenly
          </button>
        </div>
        <div style={{ display: "flex",flexDirection: "column",alignItems: "center", }}>
          {items.map((item, index) => (
            <div key={index} style={{ backgroundColor: "#fff", borderRadius: "10px",height: "10%",marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center",  width: "100%",maxWidth: "500px", }}>
              <div style={{  textAlign: "left", padding: "10px", height: "90px", width: "50%",}}>
                <div style={{ fontWeight: "bold" }}>{item.item}</div>
                <div>₹{item.price}</div>
              </div>
            </div>
          ))}
        </div>
 <button style={{ background: "none", border: "none", color: "black", marginTop: "10px",  }}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AddPersons;
