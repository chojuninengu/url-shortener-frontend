import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!url) return toast.error("Please enter a valid URL!");
    
    try {
      const response = await axios.post("${process.env.REACT_APP_API_BASE_URL}/shorten", { original_url: url });
      setShortUrl(response.data.short_url);
      toast.success("URL Shortened Successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Rust URL Shortener</h1>
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter your URL"
          className="w-full p-2 text-black rounded-md"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-600 rounded-md"
          onClick={handleShorten}
        >
          Shorten URL
        </button>
        {shortUrl && (
          <p className="mt-4">
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
