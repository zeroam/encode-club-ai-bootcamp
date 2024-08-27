"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [showGreetings, setShowGreetings] = useState(false);

  const handleSubmit = () => {
    setShowGreetings(true);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">
            Hello World
          </h1>
          <p className="text-xl text-gray-500">This is a test</p>
        </div>
        <div className="flex flex-row items-center justify-center py-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="bg-gray-200 p-2 rounded-md mr-2 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {showGreetings && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md w-full max-w-2xl">
            <p className="text-3xl font-bold text-black">
              Hello, {name}
            </p>
            <textarea
              className="w-full h-40 mt-4 p-2 text-lg text-black bg-white border border-gray-300 rounded-md resize-none"
              placeholder="Enter your message here..."
            ></textarea>
          </div>
        )}
      </div>
    </>
  );
}
