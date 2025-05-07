import  { useState,createContext } from 'react'
import Input from './components/Input'
import Categories from './components/Categories'
import Display from './components/Display';

export const commonContext = createContext();
const App = () => {
  const [category, setCategory] = useState('General');
  const [convo, setConvo] = useState([]);
  return (
    <div>
      <commonContext.Provider value={{ category, setCategory}} >
        <Categories/>
        <Display convo={convo}/>
        <Input convo={convo} setConvo={setConvo}/>
      </commonContext.Provider>
    </div>
  )
}

export default App