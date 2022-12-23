import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');
  const [rawSvgImage, setRawSvgImage] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  async function chart() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const svg = (await invoke('chart')) as string;
    console.log('svg:', svg);
    setRawSvgImage(svg);
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => greet()}>
            Greet
          </button>
          <button type="button" onClick={() => chart()}>
            Chart
          </button>
        </div>
      </div>
      <p>{greetMsg}</p>
      <h3>Matplotlib Chart</h3>
      <div dangerouslySetInnerHTML={{ __html: rawSvgImage }} />
    </div>
  );
}

export default App;
