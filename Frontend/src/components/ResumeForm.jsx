import { useSelector, useDispatch } from "react-redux";
import { updateResume } from "../store/resumeSlice";

export default function ResumeForm() {
  const resumeData = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  // Generic change handler
  const handleChange = (e, section, field, index, subField) => {
    const { value } = e.target;

    // If the field is an array → split CSV string
    if (Array.isArray(resumeData?.[section]?.[field])) {
      dispatch(
        updateResume({
          section,
          field,
          value: value.split(",").map((v) => v.trim()),
          index,
          subField,
        })
      );
    } else {
      dispatch(
        updateResume({
          section,
          field,
          value,
          index,
          subField,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Redux Resume Data:", resumeData);
    alert("Form submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Edit Resume Data
      </h2>

      {/* Personal Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
        {["name", "title", "location", "email", "phone"].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-gray-700 font-medium mb-1 capitalize">
              {field}
            </label>
            <input
              type="text"
              value={resumeData.personal_details?.[field] || ""}
              onChange={(e) =>
                handleChange(e, "personal_details", field)
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <textarea
          value={resumeData.summary || ""}
          onChange={(e) =>
            dispatch(
              updateResume({
                field: "summary",
                value: e.target.value,
              })
            )
          }
          rows={4}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Technical Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
        <input
          type="text"
          value={resumeData.skills?.technical_skills?.join(", ") || ""}
          onChange={(e) =>
            handleChange(e, "skills", "technical_skills")
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Professional Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Professional Skills</h3>
        <input
          type="text"
          value={resumeData.skills?.professional_skills?.join(", ") || ""}
          onChange={(e) =>
            handleChange(e, "skills", "professional_skills")
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Education (Example: First Entry) */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Education</h3>
        {resumeData.education?.length > 0 && (
          <div className="space-y-3">
            <label className="block font-medium">Institution</label>
            <input
              type="text"
              value={resumeData.education[0]?.institution || ""}
              onChange={(e) =>
                handleChange(e, "education", "institution", 0)
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <label className="block font-medium">Degree</label>
            <input
              type="text"
              value={resumeData.education[0]?.degree || ""}
              onChange={(e) =>
                handleChange(e, "education", "degree", 0)
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700"
      >
        Save Resume
      </button>
    </form>
  );
}
