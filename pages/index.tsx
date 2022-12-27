import Container from '../components/container'
import Comment from '../components/comment'
import Image from 'next/image'
import { useState } from 'react';

function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

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
  };
  
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Wecome to Grant Wizard!
          </h1>
          <p>
            This demo site is the early alpha of grant wizard a web app that
            takes a RPF (Request for Proposal) and generates a grant application.
          </p>

          <p>
            Here is what is build so far:
          </p>
          <ol>
              <li>1. PDF data extractor (WIP)</li>
              <li>2. PDF data sumarizer (next)</li>
              <li>3. Grant APP section maker</li>
          </ol>
          <div className="w-full h-screen flex flex-col items-center justify-center">
          <textarea
            placeholder="cars Maintenace "
            className="w-full h-full text-center text-gray-800 text-xl font-bold px-6 py-2 rounded-lg shadow-lg"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="w-full h-full flex flex-row items-center justify-center">
            <a
              className="w-full h-full text-center text-gray-800 text-xl font-bold px-6 py-2 rounded-lg shadow-lg"
              onClick={callGenerateEndpoint}
            >
              <p>Generate</p>
            </a>
          </div>
          {apiOutput && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-full h-full flex flex-row items-center justify-center">
                <div className="w-full h-full text-center text-gray-800 text-xl font-bold px-6 py-2 rounded-lg shadow-lg">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="w-full h-full text-center text-gray-800 text-xl font-bold px-6 py-2 rounded-lg shadow-lg">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
        // <Comment />
        </div>
      </Container>
    </>
  )
}

export default HomePage
