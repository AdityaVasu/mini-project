"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import StarsCanvas from "@/components/StarBg";
import Form from "@components/Form";
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";
import { fetchSentimentAnalysis } from "@app/api/sentiment";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "" });
  const [sentimentResults, setSentimentResults] = useState([]);

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = await fetchSentimentAnalysis(post.prompt);
      setSentimentResults(data);
      console.log(data);

      // Toast the response using a custom alert component
      toast.success(<Alert message={data} />, {
        style: {
          fontWeight: "bold",
          color: "black",
        },
      });

      setPost({ prompt: "" });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const Alert = ({ message }) => {
    const parseSentiment = (label) => {
      console.log(label);
      switch (label) {
        case "positive":
          return "Positive";
        case "negative":
          return "Negative";
        case "neutral":
          return "Neutral";
        default:
          return "Unknown";
      }
    };

    // Check if the message array is not empty and has elements
    if (message && message.length > 0) {
      const sentiments = message[0]; // Extract the array of sentiment analysis results

      return (
        <div className="ml-5">
          <p>Results:</p>
          <ul>
            {sentiments.map((sentiment, index) => (
              <li key={index}>
                {parseSentiment(sentiment.label)}:{" "}
                {(sentiment.score * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No sentiment analysis results available</div>;
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center px-10 mt-20 w-full z-[20]"
        >
          <motion.div variants={slideInFromTop}>
            <h1 className="head_text text-left">
              <span className="blue_gradient">Roberta Model</span>
            </h1>
          </motion.div>
          <div className="absolute inset-0 z-10 pointer-events-none">
            <StarsCanvas />
          </div>
          <motion.div variants={slideInFromLeft(0.5)}>
            <Form
              type="Enter"
              post={post}
              setPost={setPost}
              submitting={submitting}
              handleSubmit={createPrompt}
            />
          </motion.div>

          <ToastContainer
            position="top-center"
            autoClose={10000}
            hideProgressBar={true}
            style={{ width: "600px" }}
            className="mt-20"
          >
            {/* ToastContainer content */}
          </ToastContainer>
        </motion.div>
      </div>
    </>
  );
};

export default CreatePrompt;
