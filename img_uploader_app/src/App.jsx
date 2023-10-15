import './App.css';
import FormData from 'form-data'
import { useState } from 'react';
import axios from "axios";


function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const submitHandler = (event) => {
    console.log(window.location.href.split(":"));
    setProgress(0)
    const axiosInstance = axios.create({
      baseURL: `http:${window.location.href.split(":")[1]}:5000/api/upload-image`,
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percentCompleted)
      }
    });
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);
    setIsUploading(true)
    axiosInstance.post('/image-uploader', formData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      }
    })
      .then(response => {setIsUploading(false); alert("file uploaded")})
      .catch(error => console.log(error.message))
  }

  const fileHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }
  return (
    <div className='App'>
      <h1>File uploader</h1>
      {isUploading ? <h2 className='progress'>{progress}%</h2> : <div className="App">
        <form method="post" onSubmit={submitHandler}>
          <p>Select the image</p>
          <input type="file" multiple="multiple" name="image" id="image" onChange={fileHandler} required className='upload'/>
          <br />
          <input type="submit" value="submit" className='submit' />
        </form>
      </div>}
    </div>
  );
}

export default App;
