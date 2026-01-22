import { useState } from 'react'
import './App.css'

import type { Tools } from './types';

import DateBar from './components/DateBar/DateBar';
import Toolbar from './components/Toolbar/Toolbar';

const App = () => {
  const [currentTool, setCurrentTool] = useState<Tools>("write");
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <DateBar date={{selectedDate, setSelectedDate}}/>
      <main id="notebook" contentEditable>
        test
      </main>
      <Toolbar tool={{currentTool, setCurrentTool}}/>
      <button id="add-note">
        &#9998;
      </button>
    </>
  )
}

export default App
