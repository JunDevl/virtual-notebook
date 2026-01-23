import { useEffect, useRef, useState } from 'react'
import './App.css'

import type { Tools } from './types';

import DateBar from './components/DateBar/DateBar';
import Toolbar from './components/Toolbar/Toolbar';

const App = () => {
  const [currentTool, setCurrentTool] = useState<Tools>("write");
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [text, setText] = useState<string>("");
  const [dateText, setDateText] = useState<Map<Number, string>>(new Map());

  const prevDate = useRef(selectedDate);

  const notebook = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = prevDate.current;

    setDateText((dt) => dt.set(Number(previous), text));

    const currentText = dateText.get(Number(selectedDate)) ?? ""

    setText(currentText);
    notebook.current!.textContent = currentText;
    
    prevDate.current = selectedDate;
  }, [selectedDate])

  return (
    <>
      <DateBar date={{selectedDate, setSelectedDate}}/>
      <main 
        id="notebook" 
        contentEditable 
        ref={notebook} 
        onInput={e => setText((e.target as HTMLElement).textContent)}>
      </main>
      <Toolbar tool={{currentTool, setCurrentTool}}/>
      <button id="add-note">
        &#9998;
      </button>
    </>
  )
}

export default App
