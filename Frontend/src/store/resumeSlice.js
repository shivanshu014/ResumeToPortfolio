import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    technical_skills: [],
    professional_skills: [],
    languages: [],
    hobbies: [],
    certifications: [],
    experiences: [],
    education: [],
    projects: [],
    achievements: [],
}

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        updateResume: (state, action) => {
            return { ...state, ...action.payload };
        }
    },
})

export const { updateResume } = resumeSlice.actions;
export default resumeSlice.reducer;


