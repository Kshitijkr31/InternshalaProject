import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("Summarize in bullet points");
  const [summary, setSummary] = useState("");
  const [recipient, setRecipient] = useState("");

  const generateSummary = async () => {
    if (!transcript) return toast.error("Please enter transcript!");
    try {
      const res = await axios.post("http://localhost:5000/summarize", {
        transcript,
        prompt,
      });
      setSummary(res.data.summary);
      toast.success("Summary generated!");
    } catch (err) {
      console.error(err);
      toast.error("Error generating summary!");
    }
  };

  const sendEmail = async () => {
    if (!recipient) return toast.error("Please enter recipient email!");
    try {
      await axios.post("http://localhost:5000/send-email", {
        summary,
        recipient,
      });
      toast.success("Email sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error sending email!");
    }
  };

  return (
    <div className="container">
      <h1>AI Meeting Summarizer</h1>

      <label>Transcript:</label>
      <textarea
        rows="6"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste your meeting transcript here..."
      />

      <label>Custom Prompt:</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Summarize in bullet points"
      />

      <button className="btn" onClick={generateSummary}>
        Generate Summary
      </button>

      {summary && (
        <>
          <h3>Summary:</h3>
          <textarea
            rows="6"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <label>Recipient Email:</label>
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient email"
          />

          <button className="btn" onClick={sendEmail}>
            Send Email
          </button>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
