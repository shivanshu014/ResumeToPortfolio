import { useState } from "react";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import Template from "./components/Template";
import { useDispatch } from "react-redux";
import { updateResume } from "./store/resumeSlice";
import Footer from "./components/Footer/Footer";
import Header2 from "./components/Header/Header2";

function App() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("http://localhost:3000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // dispatch resume data to store
      // handled inside ResumeForm directly

      dispatch(updateResume(data));
      console.log("Uploaded Resume Data:", data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed!");
    }
  };

  return (
    <div >
      <Header2 />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Upload Your Resume
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 
                     hover:file:bg-blue-100 cursor-pointer"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg 
                     font-semibold hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </div>

      {/* <ResumeForm /> */}
      {/* <Template /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
