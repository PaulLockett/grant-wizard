import Container from "../components/container";
import Comment from "../components/comment";
import Image from "next/image";
import { useState } from "react";

function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("userInput: ", userInput);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/simplify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  };

  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">🧙🏿 Welcome to Grant Wizard!</h1>
          <p>
            This demo site is the early alpha of grant wizard a web app that
            takes a RPF (Request for Proposal) and generates a grant
            application.
          </p>
          <p>Here is what is build so far:</p>
          <ol>
            <li>0. Simple introductory demo (DONE see below) </li>
            <li>1. PDF data extractor (WIP)</li>
            <li>2. PDF data summarizer (next)</li>
            <li>3. Grant APP section maker</li>
            <li>4. Grant APP full application maker</li>
            <li>5. Prompt Engine...</li>
          </ol>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <textarea
              placeholder=" Paste a section or paragraph of a RFP here and it will be summarized below"
              className="w-full h-full text-center text-gray-800 text-xl font-bold px-6 py-2 rounded-lg shadow-lg border-solid border-2"
              value={userInput}
              onChange={onUserChangedText}
            />
            <button
              className="py-2 px-4 m-3 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
              onClick={callGenerateEndpoint}
            >
              Summary
            </button>
            {apiOutput && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full h-full m-1 text-center text-gray-800 text-xl font-bold">
                  <h3>Output</h3>
                </div>
                <div className="w-full h-full text-center text-gray-800 text-xl font-bold px-6 py-2 rounded-lg shadow-lg border-solid border-2">
                  <p>{apiOutput}</p>
                </div>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold">
            <span className="text-gray-800">
              Want to get a full grant application?
            </span>
          </h2>
          <p>
            {" "}
            Drop a link below and I will generate a grant application for you.{" "}
          </p>
          <Comment />
        </div>
      </Container>
    </>
  );
}

export default HomePage;
