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
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/shorten`,
        { original_url: url }
      );
      setShortUrl(response.data.short_url);
      toast.success("URL Shortened Successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Rust URL Shortener</h1>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Updated Input Field */}
        <input
          type="text"
          placeholder="Enter your URL"
          className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* Updated Button */}
        <button
          className="w-full mt-4 p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          onClick={handleShorten}
        >
          Shorten URL
        </button>

        {/* Display Shortened URL */}
        {shortUrl && (
          <p className="mt-4">
            Shortened URL:{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
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
