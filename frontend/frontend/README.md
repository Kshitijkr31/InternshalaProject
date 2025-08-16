# AI Meeting Summarizer & Sharer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**AI Meeting Summarizer & Sharer** is a full-stack web application built using the **MERN stack**.  
It allows users to upload meeting transcripts, generate AI-powered summaries based on custom prompts, edit them, and share via email.  

---

## 🌟 Key Features

- Upload meeting transcripts or call notes  
- Input custom summarization prompts  
- Generate structured, editable summaries  
- Share summaries via email  
- AI-powered with **Groq API** for fast and accurate summarization  

---

## 🏗 Tech Stack

**Frontend:**  
- React.js  
- Axios  
- React-Toastify (for notifications)  

**Backend:**  
- Node.js + Express  
- Groq SDK  
- Nodemailer for email functionality  
- dotenv for environment variables  

**Database:**  
- Not required (stateless AI summarizer, all processing done on request)  

---

## 📂 Project Structure

InternshalaProject/
├── backend/ # Node.js + Express backend
│ ├── server.js
│ ├── package.json
│ └── .env # API keys & credentials (NOT pushed)
│
├── frontend/
│ └── frontend/ # React app
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── package-lock.json
│
└── README.md
