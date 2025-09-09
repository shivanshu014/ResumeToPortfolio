import { useSelector, useDispatch } from "react-redux";
import { updateResume } from "../store/resumeSlice";

export default function ResumeForm() {
  const resumeData = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  const handleChange = (e) => {
  const { name, value } = e.target;

  // handle array fields
  if (["technical_skills", "professional_skills", "languages", "hobbies", "certifications"].includes(name)) {
    dispatch(updateResume({ [name]: value.split(",").map((v) => v.trim()) }));
  } else {
    dispatch(updateResume({ [name]: value || "" }));
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Data stored in Redux.");
    console.log("Redux Resume Data:", resumeData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5 mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Edit Resume Data
      </h2>

      {["name", "role", "email", "phone", "location"].map((field) => (
        <div key={field}>
          <label className="block text-gray-700 font-medium mb-1 capitalize">
            {field}
          </label>
          <input
            type="text"
            name={field}
            value={resumeData[field]}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {/* Summary */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Summary</label>
        <textarea
          name="summary"
          value={resumeData.summary}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Technical Skills
        </label>
        <input
          name="technical_skills"
          value={Array.isArray(resumeData.technical_skills) 
            ? resumeData.technical_skills.join(", ") 
            : (resumeData.technical_skills || "")
          }
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
      >
        Save Resume
      </button>
    </form>
  );
}
