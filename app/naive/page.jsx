"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import StarsCanvas from "@/components/StarBg";
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";

const grover = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
  });
  const [cacheBuster, setCacheBuster] = useState(0);
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const binaryPrompt = `I am going to give you a text, Give it a score from 0 to 100 on the negativity/ positibity/neutral score and make it a fraction to make it look more accurate.If the text is personally offensive,give a negative sentiment; otherwise, do not.(format:- Positivity Score:- , Negativity Score:- ,Neutral Score:- Justification:-(point wise)). Always give some text response.
The text provided by the user is 
${post.prompt}`;

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDMauDj30PzCDfNuIhdbPAvUCj3iOuKB-8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: binaryPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        if (data && data.candidates && data.candidates.length > 0) {
          setResponse(data.candidates);
          toast.success(
            "Response is ready. Click 'View Report' to see the details.",
            {
              style: {
                fontWeight: "bold",
                color: "black",
              },
            }
          );
          setPost({ prompt: "" });
          setCacheBuster(cacheBuster + 1);
        } else {
          toast.error("No results found.");
        }
      } else {
        toast.error("An error occurred while processing the request.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing the request.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderResponse = () => {
    return response.map((candidate, index) => {
      if (candidate.content && candidate.content.parts) {
        return (
          <div key={index} className="mb-4">
            <p className="mb-2">
              {candidate.content.parts.map((part, partIndex) => {
                const textParts = part.text.split("\n");
                return (
                  <span key={partIndex}>
                    {textParts.map((text, i) => {
                      if (text.startsWith("**") && text.endsWith("**")) {
                        // Render text within ** as bold
                        return (
                          <span key={i} className="font-bold">
                            {text.substring(2, text.length - 2)}
                          </span>
                        );
                      } else {
                        return (
                          <span key={i}>
                            {text}
                            <br />
                          </span>
                        );
                      }
                    })}
                  </span>
                );
              })}
            </p>
          </div>
        );
      } else if (candidate.finishReason === "SAFETY") {
        return (
          <div key={index} className="mb-4">
            <p className="mb-2">Safety Ratings:</p>
            <ul>
              {candidate.safetyRatings.map((rating, ratingIndex) => (
                <li key={ratingIndex}>
                  Category: {rating.category}, Probability: {rating.probability}
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        return <div key={index}>CAN NOT PROCESS</div>;
      }
    });
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center px-10 mt-20 w-full z-[20]">
          <motion.div variants={slideInFromTop}>
            <h1 className="text-4xl font-bold mb-4 text-center text-green-500">
              Llama Model (Explainable AI Approach)
            </h1>
          </motion.div>

          <motion.div variants={slideInFromLeft(0.5)}>
            <Form
              type="Enter"
              post={post}
              setPost={setPost}
              submitting={submitting}
              handleSubmit={createPrompt}
            />
          </motion.div>

          {response && (
            <button
              onClick={() => setShowModal(true)}
              className="z-[20] mt-4 px-4 py-2 bg-teal-500 text-white rounded"
            >
              View Report
            </button>
          )}

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-[20]">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Response Report</h2>
                {response ? renderResponse() : "No response available."}
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="absolute inset-0 z-10 pointer-events-none">
            <StarsCanvas />
          </div>
        </div>

        <div className="mt-10">
          <ToastContainer
            position="bottom-center"
            autoClose={10000}
            hideProgressBar
            style={{ width: "600px" }}
          />
        </div>
      </div>
    </>
  );
};

export default grover;
