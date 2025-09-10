import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personal_details: {
    name: "",
    title: "",
    location: "",
    email: "",
    phone: "",
    links: [], // [{name, url}]
  },
  summary: "",
  skills: {
    technical_skills: [],
    professional_skills: [],
  },
  education: [],
  projects: [],
  experience: [],
  additional_information: {
    languages: [],
    certifications_achievements: [],
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResume: (state, action) => {
      return { ...state, ...action.payload };  // overwrite with parsed data
    },

    updateResume: (state, action) => {
      const { section, field, value, index, subField } = action.payload;

      if (section && field !== undefined) {
        if (Array.isArray(state[section])) {
          if (index !== undefined) {
            if (subField) {
              state[section][index][field][subField] = value;
            } else {
              state[section][index][field] = value;
            }
          }
        } else {
          state[section][field] = value;
        }
      } else {
        state[field] = value;
      }
    },

    addArrayItem: (state, action) => {
      const { section, item } = action.payload;
      if (Array.isArray(state[section])) {
        state[section].push(item);
      }
    },

    removeArrayItem: (state, action) => {
      const { section, index } = action.payload;
      if (Array.isArray(state[section])) {
        state[section].splice(index, 1);
      }
    },
  },
});

export const { setResume, updateResume, addArrayItem, removeArrayItem } =
  resumeSlice.actions;
export default resumeSlice.reducer;
