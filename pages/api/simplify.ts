import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-fJg0Ehs4Fr03yRLGTliqopW1",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract the text to be simplified from the request body
    const text = req.body.userInput;
    console.log(text);

    // Add the prefix to the text
    const prompt = `Using no filler words and simple language, simplify the below text so that it's more concise. After your simplified text response, provide a comma separated list of the most important words, phrases, and relationships in the below text: ${text}`;

    // Use the OpenAI API to generate a response
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.8,
      max_tokens: 1000
    });
    console.log(response);
    console.log(response.data);
    console.log(response.data.choices);
    console.log(response.data.choices[0]);

    // Return the response from the OpenAI API
    res.status(200).json({ output: response.data.choices.pop() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    
  }
}
