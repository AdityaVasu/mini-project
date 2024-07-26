// api.js
"use server"

import Prompt from "@models/prompt";

export async function fetchSentimentAnalysis(prompt) {
  try {
    const translationResponse = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: prompt
      })
    });

    if (!translationResponse.ok) {
      throw new Error("Failed to translate text.");
    }

    const translatedText = await translationResponse.json();
    const translatedPrompt = translatedText.translated_text;
     console.log(translatedPrompt);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: translatedPrompt,
        }),
      }
    );
  const data = await response.json();
  console.log(data);
  console.log(response.status);
   console.log(translatedPrompt);

      if (response.ok) {
      console.log(data);

      // Step 3: Check the sentiment and act on negative results
      if (
        data[0][0].label.toLowerCase() === "negative" &&
        data[0][0].score < 0.9
      ) {
        const secondaryResponse = await fetch(
          "https://sunfish-guiding-killdeer.ngrok-free.app/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: translatedPrompt }),
          }
        );

        if (!secondaryResponse.ok) {
          throw new Error("Failed to call the secondary API.");
        }
      }

      return data;
    } else {
      throw new Error("Failed to get sentiment analysis result.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while processing the request.");
  }
}



