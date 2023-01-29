import './App.css'
import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

export default function App() {
  const [Prompt, setPrompt] = useState("")
  const [Image, setImage] = useState('')
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OpenAI_API_Key,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: Prompt,
      n: 1,
      size: "1024x1024",
    });
    setImage(response.data.data[0].url)
  }
  return (
<>
    <main>
      <h1>Generate an Image</h1>
      <input
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type something to generate an Image.."
      />
      <button onClick={generateImage}> Generate Image</button>
    </main>
  <div>
      {Image.length > 0 ? <img className='generatedImage' src={Image} alt="Generated Image" /> : <></>}
  </div>
</>
  )
}
