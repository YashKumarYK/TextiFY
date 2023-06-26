import './TextForm.css'
import axios from 'axios';
import React,{useState, useEffect} from 'react'

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [newText, setnewText] = useState("");

  //for text translator
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [detectLanguageKey, setdetectedLanguageKey] = useState('')
    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: text
        })
        .then((response) => {
            setdetectedLanguageKey(response.data[0].language)
        })
    }

    const translateText = () => {
        setnewText(text)

        getLanguageSource();

        let data = {
            q : text,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setnewText(response.data.translatedText)
        })
    }

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    useEffect(() => {
       axios.get(`https://libretranslate.de/languages`)
       .then((response) => {
        setLanguagesList(response.data)
       })

       getLanguageSource()
    }, [text])


  //while entering the text 
  const handleOnChange=(event)=>{
    setText(event.target.value);
    console.log("handleonchange was clicked !!")
  }

  // uppercase button
  const handleUpClick=()=>{
    let newtxt = text.toUpperCase();
    setnewText(newtxt);
    console.log("handleupclick was run")
    props.showalert("Converted to uppercase!", "success!")

  }

  //lowercase button
  const handleLoClick=()=>{
    let newtxt = text.toLowerCase();
    setnewText(newtxt);
    console.log("handleLoclick was run")
    props.showalert("Converted to Lowercase!", "success!")

  }

  //clear text button
  const handleclearClick=()=>{
    let newtxt = '';
    setText(newtxt);
    setnewText(newtxt)
    console.log("handleclearclick was run")
    props.showalert("Text is Cleared!", "success!")

  }

  //copy button
  // const handlecopy=()=>{
  // const cb = navigator.clipboard;
  // const text = document.querySelector('myBox2');
  // cb.writeText(text.innerText).then(() => alert('Text copied'));
  // props.showalert("text copied to clipboard", "success!")
  // }  

  const handleSpaces=()=>{
    let newtxt = text.split(/[ ]+/);
    setnewText(newtxt.join(" "))
    props.showalert("Extra spaces removed", "success!")

  }

  function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
  }
  const countFreq=()=>{
    var freq = wordFreq(text);
    var nwtxt = "";
    Object.keys(freq).sort().forEach(function(word) {
        nwtxt += word + " : " + freq[word]+"\n";
    });
    setnewText(nwtxt);
  }

  

  var Bkgcolor = props.mode==='dark'?'#132536e6':'white'; //for background color toggling
  
  var clr = props.mode==='light'?'#132536e6':'white';   //for font color toggling

  return (
    <div className="form" style={{backgroundColor:props.mode==='light'?'#dfdfff4d':'rgb(29 12 12 / 45%)'}} >
      <div id="input" className='container' style = {{color: clr}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
        <textarea placeholder="Enter text here" className="form-control"  value = {text} onChange={handleOnChange} style = {{backgroundColor: Bkgcolor , color: clr}}id="myBox" rows = "10"></textarea>
        </div>
        <div id="translator" className='container ms-2' >
          <h3>Translate to</h3>
          <select className="language-select"  onChange={languageKey}>
              <option>Select Language</option>
              {languagesList.map((language) => {
                return (
                  <option value={language.code}>
                      {language.name}
                  </option>
                )
              })}
          </select>
          <button id="translate" className='btn btn-sm btn-primary mx-1 my-1' onClick={translateText}>Translate</button>
        </div>
        <div   className='container mt-2' style={{display: "flex", flexWrap: "wrap", alignItems: 'center'}}>
          <button className='btn btn-sm btn-primary mx-1 my-1' onClick={handleSpaces}>Remove Extra Spaces</button>
          <button className='btn btn-sm btn-primary mx-1 my-1' onClick={countFreq}>Count frequency</button>
        </div>
        <div className=" btn-group mt-2 ms-3">
          <a  href='/' className="btn btn-sm btn-primary active" aria-current="page">Convert</a>
          <button   className="btn btn-sm btn-primary" onClick={handleUpClick}>Uppercase</button>
          <button   className="btn btn-sm btn-primary" onClick={handleLoClick}>Lowercase</button>
        </div>
        <div className='container mt-1'>
        <button id="clr-btn" className='btn btn-sm btn-primary mx-1 my-1' onClick={handleclearClick}>Clear Text</button>
        </div>
        
      </div>

      <div id="output" className='container' style = {{color: clr}}>
        <h1>Resulted Text</h1>
        <textarea placeholder= "Enter text to preview here" className="form-control" value = {newText} onChange={handleOnChange} style = {{backgroundColor: Bkgcolor , color:clr}} id="myBox2" rows="10"></textarea>
        {/* <button className='btn btn-primary my-1' onClick={handlecopy}>Copy</button> */}
        <p>Total words: {newText.length===0?0:newText.split(" ").length}</p>
        <p>Total Characters: {newText.length}</p>
        <p>Average Reading Time: { 0.008 * newText.split(" ").length} minutes</p>
      </div>
    </div>
  ) 
} 
