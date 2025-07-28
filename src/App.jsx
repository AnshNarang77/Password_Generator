import { use, useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [password, setPassword] = useState("")
  const [numsAllowed,setNumsAllowed] =useState(false)
  const [charsAllowed,setCharsAllowed] =useState(false)
  // const passref= useRef(null)
const copyToClipboard=()=>{
  navigator.clipboard.writeText(password).then(alert("Copied")).catch((err)=>console.log(err,"Something went wrong"))
}
  const passGen= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numsAllowed) str+="0123456789"
    if(charsAllowed) str+="!@#$%^&*.:/+="
    
    for(let i=0 ;i<length;i++)
    {
      let char= Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char) 
    }
    setPassword(pass)
  },[length,charsAllowed,numsAllowed])

  useEffect(()=>{
    passGen()
  },[length,numsAllowed,charsAllowed,passGen])
  return (
    <>
   <div className='h-screen w-screen bg-gray-800  flex flex-col justify-center items-center' >
    <div className='w-[80vw]  p-5 bg-gray-700 rounded-xl'>
      <h1 className='text-white text-2xl sm:text-3xl font-light text-center'>PASSWORD GENERATOR</h1>
      <div className=' mt-4 flex justify-center '><input type="text" readOnly value={password} className='bg-white p-1 sm:p-2 w-[80%] text-xl font-semibold'/>
      <button className='bg-amber-300 p-2 font-semibold px-4' onClick={copyToClipboard}>COPY</button></div>
      <div className='text-center mt-5 text-white font-semibold sm:text-lg text-wrap'><p>Your Password : {password}</p></div>

      <div className='mt-6 text-white flex flex-col sm:flex-row justify-center items-center  gap-2'>
        <label htmlFor="slider" className='text-xl'>Length: {length}</label>
      <input type="range" name="" id="slider" min={6} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}} />
    <label htmlFor="chars" className='text-xl'>Special Characters</label>
    <input type="checkbox" name="" id="chars" className='p-2' defaultChecked={charsAllowed} onChange={()=>{setCharsAllowed((prev)=>!prev)}}/>
    <label htmlFor="nums" className='text-xl'>Numbers</label>
    <input type="checkbox" name="" id="nums" className='p-2' defaultChecked={numsAllowed} onChange={()=>{setNumsAllowed((prev)=>!prev)}} />
      </div>
    </div>
    <p className=' text-white mt-5 text-center sm:text-xl'>Tip :- Include special characters and numbers to generate stronger password.</p>
   </div>
    </>
  )
}

export default App
