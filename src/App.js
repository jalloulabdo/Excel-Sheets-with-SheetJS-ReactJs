 import './App.css';
import React, { useState, useRef } from "react";
import * as XLSX from 'xlsx'

function App() {
  const [File, setFile] = useState(null)
  const [FileName, setFileName] = useState(null)
  const [SheetNames, setSheetNames] = useState([])
  const [SheetData, setSheetData] = useState({})
  const FileRef = useRef()
  const acceptableFileName = ['xlsx', 'xls'];



  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  } 

  const readDataFromExcel = (data) => {
    const wb = XLSX.read(data)

    setSheetNames(wb.SheetNames)

    var mySheetDate ={}
    //Loop throught The Sheets
    for (let i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i]
       
      const workSheet = wb.Sheets[sheetName]
      const JsonData = XLSX.utils.sheet_to_json(workSheet)
      
      mySheetDate[sheetName] =JsonData
      
    }

    setSheetData(mySheetDate)
    //Assign Data from Sheet To Objects

    console.log(mySheetDate);
  }

  const handleFile = async(e) => {
    const myFile = e.target.files[0];

    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert("Invalid File Type")
      return;
    }
    //Read XLSX MetaData
    const data = await myFile.arrayBuffer()
    

    readDataFromExcel(data)

     
    setFileName(myFile.name)
    setFile(myFile)
  }

  const handleRemove = () => {
    setFile(null)
    setFileName(null)
    FileRef.current.value = "";
  }
   
  return (
    <div className="App">
      <div>
        {FileName && <p>FileName : {FileName}</p>}
        {!FileName && <p>Please Upload a File</p>}
      </div>
      <div style={{ textAlign: "center" }}>
        <input type='file' accept='xlsx,xls' multiple={false} onChange={(e) => handleFile(e)} ref={FileRef} />
        {FileName && <i className="bi bi-x-lg " style={{cursor: 'pointer'}} onClick={handleRemove}></i>}
      </div>
    </div>
  );
}

export default App;
