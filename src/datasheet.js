import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Select from 'react-select'; 
import './datasheet.css'; 

const Datasheet= () => {
  const [methods, setMethods] = useState([{ method: '', runs: '', testLocations: '' }]);
  const [formData, setFormData] = useState({
    clientName: '',
    projectNumber: '',
    location: '',
    startDate: '',
  });


  const methodOptions = [
    { value: 'Carb Method 501', label: 'Carb Method 501' },
    { value: 'CTM-013', label: 'CTM-013' },
    { value: 'CTM-013 (IC Analyzer)', label: 'CTM-013 (IC Analyzer)'},
    { value: 'CTM-027', label: 'CTM-027' },
    { value: 'CTM-042', label: 'CTM-042' },
    { value: 'Method 11', label: 'Method 11'},
    { value: 'Method 12', label: 'Method 12'},
    { value: 'Method 13B', label: 'Method 13B'},
    { value: 'Method 16A', label: 'Method 16A'},
    { value: 'Method 16C', label: 'Method 16C'},
    { value: 'Method 17', label: 'Method 17'},
    { value: 'Method 18', label: 'Method 18'},
    { value: 'Method 2', label: 'Method 2'},
    { value: 'Method 201', label: 'Method 201'},
    { value: 'Method 201A', label: 'Method 201A'},
    { value: 'Method 202', label: 'Method 202'},
    { value: 'Method 22', label: 'Method 22'},
    { value: 'Method 23', label: 'Method 23'},
    { value: 'Method 23PCB', label: 'Method 23PCB'},
    { value: 'Method 25', label: 'Method 25'},
    { value: 'Method 25A', label: 'Method 25A'},
    { value: 'Method 25C', label: 'Method 25C'},
    { value: 'Method 26', label: 'Method 26'},
    { value: 'Method 26A', label: 'Method 26A'},
    { value: 'Method 26A (IC Analyzer)', label: 'Method 26A (IC Analyzer)'},
    { value: 'Method 29', label: 'Method 29'},
    { value: 'Method 2C', label: 'Method 2C'},
    { value: 'Method 2E', label: 'Method 2E'},
    { value: 'Method 2G', label: 'Method 2G'},
    { value: 'Method 2F', label: 'Method 2F'},
    { value: 'Method 30B', label: 'Method 30B'},
    { value: 'Method 30B (Lumex on Site)', label: 'Method 30B (Lumex on Site)'},
    { value: 'Method 323', label: 'Method 323'},
    { value: 'Method 4', label: 'Method 4'},
    { value: 'Method 5', label: 'Method 5'},
    { value: 'Method 5 (PM Lab on Site)', label: 'Method 5 (PM Lab on Site)'},
    { value: 'Method 5A', label: 'Method 5A'},
    { value: 'Method 5B', label: 'Method 5B'},
    { value: 'Method 5D', label: 'Method 5D'},
    { value: 'Method 5E', label: 'Method 5E'},
    { value: 'Method 204', label: 'Method 204'},
    { value: 'Method 204B', label: 'Method 204B'},
    { value: 'Method 204D', label: 'Method 204D'},
    { value: 'Method 3A', label: 'Method 3A'},
    { value: 'Method 6', label: 'Method 6'},
    { value: 'Method 8', label: 'Method 8'},
    { value: 'Method 8A', label: 'Method 8A'},
    { value: 'Method 9', label: 'Method 9'},
    { value: 'OTM 45 PFSA', label: 'OTM 45 PFSA'},
    { value: 'SW-846 0010', label: 'SW-846 0010'},
    { value: 'SW-846 0030', label: 'SW-846 0030'},
    { value: 'SW-846 0061', label: 'SW-846 0061'},
    { value: 'TO-15', label: 'TO-15'},
    { value: '(ALT-001)', label: '(ALT-001)'},
    { value: '(ALT-010)', label: '(ALT-010)'},
    { value: '(ALT-043)', label: '(ALT-043)'},
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMethodChange = (selectedOption, index) => {
    const updatedMethods = methods.map((method, i) => {
      if (i === index) {
        return { ...method, method: selectedOption.value };
      }
      return method;
    });
    setMethods(updatedMethods);
  };
  

  const addMethod = () => {
    setMethods([...methods, { method: '', runs: '', testLocations: '' }]);
  };

  const removeMethod = (index) => {
    setMethods(methods.filter((_, i) => i !== index));
  };

  const submitForm = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = [
      ['Client Name', formData.clientName],
      ['Project Number', formData.projectNumber],
      ['Location', formData.location],
      ['Start Date', formData.startDate],
      ...methods.map((method, index) => [
        `Method`, method.method, method.runs, method.testLocations
      ])
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'datasheet.xlsx');
  };


  return (
    <div className="form-container">
      <h2>Datasheet Input Form</h2>
      <form>
        <div className="label-group">
          <div>
            <label htmlFor="clientName">Client Name:</label><br />
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="projectNumber">Project Number:</label><br />
            <input
              type="text"
              id="projectNumber"
              name="projectNumber"
              value={formData.projectNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label><br />
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label><br />
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
  
        <div id="methods">
          {methods.map((method, index) => (
            <div className="method-group" key={index}>
              <Select
                placeholder="Select a method"
                value={methodOptions.find(option => option.value === method.method)}
                onChange={(option) => handleMethodChange(option, index)}
                options={methodOptions}
                isSearchable={true}
                className="method-select"
              />
              <input
                type="number"
                name="runs"
                placeholder="Number of runs"
                value={method.runs}
                onChange={(e) => {
                  const updatedMethods = methods.map((m, i) => 
                    i === index ? { ...m, runs: e.target.value } : m
                  );
                  setMethods(updatedMethods);
                }}
              />
              <input
                type="number"
                name="testLocations"
                placeholder="Number of test locations"
                value={method.testLocations}
                onChange={(e) => {
                  const updatedMethods = methods.map((m, i) => 
                    i === index ? { ...m, testLocations: e.target.value } : m
                  );
                  setMethods(updatedMethods);
                }}
              />
              <button type="button" onClick={() => removeMethod(index)} className="remove-method-btn">Remove Method</button>
            </div>
          ))}
        </div>
        
        <button type="button" onClick={addMethod} className="add-method-btn">Add Another Method</button><br /><br />
        <button type="button" onClick={submitForm} className="submit-btn">Create Datasheet</button>
      </form>
    </div>
  );  
};


export default Datasheet;
