
import './App.css'
import {Configuration, OpenAIApi} from 'openai';
import Options from './components/options'
import Translation from './components/translation'
import { items } from './choices'
import { useState } from 'react'

function App() {
  

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);


  const [option, setOption] = useState({})
  const[input,setInput]=useState(''); 
  const[result,setResult]=useState(''); 

  const selectOption = (option) => {
    setOption(option)
  }

  const doStuff = async () => {
    // setOption({...option,prompt:input});
    let object={...option,prompt:input}
    // console.log(object)
    
    const response = await openai.createCompletion(object);
    setResult(response.data.choices[0].text);



  }
  // console.log(option);
  


  return (
    <div className="App">
      {Object.values(option).length === 0 ? <Options items={items} selectOption={selectOption} />
        : <Translation doStuff={doStuff} setInput={setInput}  result={result}/>}
    </div>
  )
}

export default App
