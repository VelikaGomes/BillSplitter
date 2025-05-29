import React, { useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';

const AddPersons=() => {
  const location=useLocation();
  const { items=[], tip=0, tax=0, total=0 }=location.state||{};
  const [persons, setPersons]=useState([{ name: ""}]);
  const [assignments, setAssignments]=useState({});
  const addPerson = () => setPersons([...persons, { name: ""}]);
  const navigate=useNavigate();

  const removePerson = (index) => {
    if (persons.length === 1) return;
    setPersons(persons.filter((_, i) => i !== index));
  };

  const addPersonList = (index, value) => {
    const update = [...persons];
    update[index].name = value;
    setPersons(update);
  };

  const toggleButton=(itemIndex, personIndex)=>{
    setAssignments(prev => {
        const selected=prev[itemIndex] || [];
        const isSelected=selected.includes(personIndex);
        const updated=isSelected ? selected.filter(i=> i !==personIndex)
        : [...selected, personIndex];
        return {...prev, [itemIndex]: updated};
    });
  };

  const splitEven=()=>{
    const newAssignments={};
    items.forEach((_, itemIndex)=>{
      newAssignments[itemIndex]=persons.map((_, personIndex)=> personIndex);
    });
    setAssignments(newAssignments);
  };

  const continueButton =()=>{
  
    navigate('/FinalSplit',{
      state: {items, tip, tax, total, persons, assignments}
    });
  };

   const canContinue = () => {
    const hasValidNames = persons.length>0;
    const hasAssignments = Object.keys(assignments).some(
      itemIndex => assignments[itemIndex] && assignments[itemIndex].length > 0
    );
    return hasValidNames && hasAssignments;
  };
  
  return (
    <div style={{  backgroundColor: '#E1DACA',textAlign: 'center', width: '100%', height: '130vh',padding: '20px', borderStyle:'none' }}>
      <h2>Add People</h2>
      <p>Type all the names and assign the items</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {persons.map((person, index) => (
          <div key={index} style={{display: 'flex', gap: '10px', margin:'10px', alignItems: 'center',width: '100%', justifyContent: 'center', maxWidth: '600px'}}>
            <input type='text' value={person.name} onChange={(e) => addPersonList(index, e.target.value)} placeholder={`Person ${index + 1}`}
              style={{ flex: 1, padding: '10px', borderRadius: '10px', borderStyle: 'none', width: '25%'}}/>
            {persons.length > 1 && (
              <button onClick={() => removePerson(index)} style={{ background: 'none', border: 'none', color: 'black' }}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addPerson} style={{ margin:'10px', padding:'10px',width: '50%', borderRadius: '8px', borderStyle:'none' }}>
          Add Person
        </button>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Assigned Items</h3>
            <button onClick={splitEven} style={{ backgroundColor: '#F1EFE9', padding: '8px', margin: '10px',borderRadius: '6px', border: '1px solid #ccc' }}>
              Split evenly
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {items.map((item, index) => (
              <div key={index} style={{ backgroundColor:'white', borderRadius: '10px', height:'90px', margin:'10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',padding:'10px'}}>
                <div style={{ textAlign: 'left', padding: '10px', width: '100%' }}>
                  <div style={{ fontWeight: 'bold' }}>{item.item}</div>
                  <div>₹{item.price}</div>
                  <div style={{margin:'5px'}}>
                    
                    {persons.map((person, pIndex) => {
                        const isAssigned = assignments[index]?.includes(pIndex);
                        return (
                          <button key={`${index}-${pIndex}`} onClick={() => toggleButton(index, pIndex)}
                            style={{width: "auto",borderRadius: "4px", padding: "5px 10px", backgroundColor: isAssigned ? "#CC5500" : "#fff",
                              color: isAssigned ? "#fff" : "#000", margin: "5px", border: "1px solid #ccc", cursor: "pointer",
                            }}>
                            {person.name || `Person ${pIndex + 1}`}
                          </button>
                        );
                    })}
                        <br></br>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={continueButton} disabled={!canContinue} style={{ backgroundColor:'#CC5500', width: '50%', height: '50px', borderRadius: '15px', color: 'white', padding: '5px', borderStyle: 'none',margin: '20px',
          cursor: canContinue()? 'pointer': 'not-allowed'}}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPersons;

