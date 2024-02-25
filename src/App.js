import React, { useState } from 'react'

function App() {
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  
  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = async (e)=> {
    e.preventDefault()
    console.log(formData)
    const res = await fetch('/login', {
      method: "POST",
      headers: {"content-type":"application/json", "accepts":"application/json"},
      body: JSON.stringify(formData)
    })
  }

  const check = async (e) => {
    console.log('check')
    const res = await fetch('checkuser')
    const data = await res.json()
    console.log(data)
  }
  
  const logout = async (e) => {
    const res = await fetch('/logout', {
      method: "DELETE"
    })
    console.log('logout')
  }

  return (
    <div className="App">
      <form onChange={onChange} onSubmit={onSubmit}>
        <input placeholder='username' name='username' value={formData.username}/>
        <input placeholder='password' name='password' value={formData.password}/>
        <button type='submit'>Submit</button>
      </form>
      <button onClick={check}>Check</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default App;
