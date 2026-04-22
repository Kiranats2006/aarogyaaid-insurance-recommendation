import { useState } from "react";
import axios from "axios";

function ChatPanel({
    userProfile
}) {

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([]);


    async function askQuestion() {

        if (!question) {
            return;
        }


        const userMessage = {
            role: "user",
            text: question
        };


        setMessages([
            ...messages,
            userMessage
        ]);


        try {

            const response =
                await axios.post(
                    "http://localhost:5000/chat",
                    {
                        question: question,
                        userProfile: userProfile
                    }
                );


            const botMessage = {
                role: "assistant",
                text:
                    response.data.answer
            };


            setMessages(
                prev => [
                    ...prev,
                    botMessage
                ]
            );


            setQuestion("");

        }

        catch (error) {

            console.error(error);

        }

    }


    return (

        <div className="mt-8 p-6 border rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-4">
                Policy Explainer Chat
            </h2>


            <div className="space-y-3 mb-4">

                {
                    messages.map(
                        function(msg, index) {

                            return (

                                <div
                                    key={index}
                                    className="border p-3 rounded"
                                >

                                    <b>
                                        {msg.role}:
                                    </b>

                                    {" "}

                                    {msg.text}

                                </div>

                            );

                        }
                    )
                }

            </div>



            <input
                value={question}
                onChange={
                    (e) =>
                    setQuestion(
                        e.target.value
                    )
                }
                placeholder="Ask about waiting period..."
                className="w-full border p-3 rounded mb-3"
            />


            <button
                onClick={askQuestion}
                className="w-full p-3 rounded bg-black text-white"
            >
                Ask
            </button>

        </div>

    );

}

export default ChatPanel;