"use client";
import { useState } from "react";

export default function Home() {
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Yo, this is ChatterBot! How can I help you today?",
    },
  ]);

  const callGetResponse = async () => {
    // Don't proceed if input is empty
    if (!theInput.trim()) {
      console.log("Empty input, not sending request");
      return;
    }

    setIsLoading(true);
    
    // Create a new array instead of mutating the original
    const newUserMessage = { role: "user", content: theInput };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setTheInput("");
    console.log("Calling OpenAI...");

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, newUserMessage] }),
      });

      const data = await response.json();
      console.log("Full API response:", data);
      
      if (!response.ok) {
        console.error("API Error:", data.error);
        console.error("Error details:", data.details);
        // Show user-friendly error message
        const errorMessage = { 
          role: "assistant", 
          content: `Error: ${data.error}. ${data.details || ''}` 
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setIsLoading(false);
        return;
      }

      const { output } = data;
      
      if (output && output.content) {
        console.log("OpenAI replied...", output.content);
        setMessages((prevMessages) => [...prevMessages, output]);
      } else {
        console.error("Invalid response structure:", output);
        const errorMessage = { 
          role: "assistant", 
          content: "Sorry, I received an invalid response. Please try again." 
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
      
    } catch (error) {
      console.error("Error calling API:", error);
      const errorMessage = { 
        role: "assistant", 
        content: "Sorry, there was an error connecting to the server. Please try again." 
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
    
    setIsLoading(false);
  };

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };

  return (

    <main
    className="flex min-h-screen flex-col items-center justify-between px-24 py-5"
  >
    <h1 className="text-5xl font-sans">ChatterBot</h1>

    <div
      className="flex  h-[35rem] w-[40rem] flex-col items-center bg-gray-600 rounded-xl"
    >
      <div
        className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full"
      >
        {messages.map((e) => {
          return (
            <div
              key={e.content}
              className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
                e.role === "assistant"
                  ? "self-start  bg-gray-200 text-gray-800"
                  : "self-end  bg-gray-800 text-gray-50"
              } `}
            >
              {e.content}
            </div>
          );
        })}

        {isLoading ? <div className="self-start  bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">*thinking*</div> : ""}
      </div>
      <div className="relative  w-[80%] bottom-4 flex justify-center">
        <textarea 
          id="chat-input"
          name="chatInput"
          value={theInput} 
          onChange={(event) => setTheInput(event.target.value)} 
          className="w-[85%] h-10 px-3 py-2 resize-none overflow-y-auto text-black bg-gray-300 rounded-l outline-none"
          onKeyDown={Submit}
          placeholder="Type your message here..."
        />
        <button
          onClick={callGetResponse}
          className="w-[15%] bg-blue-500 px-4 py-2 rounded-r"
        >
          send
        </button>
      </div>
    </div>

    <div></div>
  </main>
  );
}