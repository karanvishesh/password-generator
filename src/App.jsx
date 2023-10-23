import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useCallback } from 'react';


function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  
  const generatePassword = useCallback(()=> {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumberAllowed) str += "0123456789";
    if(isCharAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for(let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length);
      password += str[ind];
    }
    setPassword(password);
  }, [
    length, isNumberAllowed, isCharAllowed, setPassword
  ]);

  const copyPasswordToClipboard = () => {
    passwordRef.current.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }
  
  const passwordRef = useRef(null);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharAllowed]);

  

  return (
    <div className='w-full h-screen bg-black text-orange-500'>
      <div className="flex  max-w-xl mx-auto flex-col flex-wrap py-4 align-middle">
    <h1 className='text-white text-4xl mx-auto'> Password Generator </h1>
      <div className='bg-gray-800 p-4 rounded-lg mt-6 px-4 max-w-xl flex flex-row '>
        <input type="text" ref={passwordRef} value={password} readOnly  className="outline-none w-full px-3 font-semibold"/>
        <button
        className='outline-none bg-orange-600 text-white px-4 py-2 shrink-0 rounded-tr-md rounded-br-md copyButton'
        onClick={copyPasswordToClipboard}
        >copy</button>
      </div>
      <div className="flex text-md gap-3 mt-3">
      <input type="range" id='lengthRange' onChange={
        e => setLength(e.target.value)
      } min="8" max="30" value={length}/>
     <label htmlFor="lengthRange"> {`Length (${length})`}</label>
     <input type="checkbox" name="isNumberAllowed" id="numCheckbox" onChange={(val) => setIsNumberAllowed(
        val.target.checked
     )}/>
     <label htmlFor="numCheckbox"> Numbers </label>
      <input type="checkbox" name="isCharAllowed" id="charCheckbox" onChange={(val) => setIsCharAllowed(
        val.target.checked
     )}/>
      <label htmlFor="charCheckbox"> Characters </label>
      </ div>
      </div>
    </div>
  )
}

export default App
