"use client";

import { useChat } from "ai/react";
import { useState, useRef } from "react";


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(fileList);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
          {m?.experimental_attachments
            ?.filter((attachment) => { attachment?.contentType?.startsWith("image/") })
            .map((attachment, index) => {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${m.id}-${index}`}
                  src={attachment.url}
                  width={500}
                  alt={attachment.name}
                />
              )
            })}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          handleSubmit(e, {
            experimental_attachments: files,
          });

          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
        className="fixed bottom-0 w-full max-w-md p-2 mb-8 rounded shadow-xl"
      >
        <div className="flex">
          <input
            ref={fileInputRef}
            type="file"
            className=""
            onChange={(e) => {
              if (e.target.files) {
                setFiles(e.target.files);
              }
            }}
          />
          <input
            className="w-full p-2 text-black"
            value={input}
            placeholder="Ask the AI anything..."
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
