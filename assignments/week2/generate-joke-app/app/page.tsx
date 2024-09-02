"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Lightbulb,
  Smile,
  MessageSquare,
  Thermometer,
  Zap,
  ThumbsUp,
  Check,
  X,
  Bot,
} from "lucide-react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("funny");
  const [jokeType, setJokeType] = useState("one-liner");
  const [isGenerateDisabled, setIsGenerateDisabled] = useState(true);
  const [temperature, setTemperature] = useState(1);
  const [generatedJoke, setGeneratedJoke] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const { messages, setMessages, append } = useChat({
    api: "/api/chat",
    body: {
      temperature,
    },
  });
  const {
    messages: evaluationMessages,
    setMessages: setEvaluationMessages,
    append: appendEvaluation,
  } = useChat({
    api: "/api/evaluate",
  });

  const initializeMessages = () => {
    setMessages([]);
    setEvaluationMessages([]);
    setGeneratedJoke("");
    setEvaluation("");
    setAiMessage("");
  };

  const generateJoke = async () => {
    initializeMessages();
    append({
      role: "user",
      content: `
      Topic: ${topic}
      Tone: ${tone}
      Joke Type: ${jokeType}
      `,
    });
  };

  useEffect(() => {
    const isFormValid = topic && tone && jokeType;
    if (!isFormValid) {
      setIsGenerateDisabled(true);
      return;
    }
    setIsGenerateDisabled(false);
  }, [topic, tone, jokeType]);

  useEffect(() => {
    if (messages.length < 2) {
      return;
    }
    setGeneratedJoke(messages[messages.length - 1]?.content);
  }, [messages]);

  const evaluateJoke = () => {
    appendEvaluation({
      role: "user",
      content: `Evaluate the joke: ${generatedJoke}`,
    });
  };

  useEffect(() => {
    if (evaluationMessages.length < 2) {
      return;
    }
    const message = evaluationMessages[evaluationMessages.length - 1].content;
    if (message.toLowerCase().includes("funny")) {
      setEvaluation("funny");
    } else if (message.toLowerCase().includes("appropriate")) {
      setEvaluation("appropriate");
    } else if (message.toLowerCase().includes("offensive")) {
      setEvaluation("offensive");
    }
    setAiMessage(message);
  }, [evaluationMessages]);

  return (
    <main className="min-h-screen w-full bg-gray-900 p-3 text-gray-100">
      <h1 className="mb-8 text-center text-3xl font-bold text-purple-400">
        AI Joke Generator
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-gray-300">
              <Lightbulb className="mr-2 inline-block h-4 w-4" />
              Topic
            </Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger
                id="topic"
                className="border-gray-700 bg-gray-800 text-gray-100"
              >
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="movies">Movies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone" className="text-gray-300">
              <Smile className="mr-2 inline-block h-4 w-4" />
              Tone
            </Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger
                id="tone"
                className="border-gray-700 bg-gray-800 text-gray-100"
              >
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                <SelectItem value="funny">Funny</SelectItem>
                <SelectItem value="sarcastic">Sarcastic</SelectItem>
                <SelectItem value="dry">Dry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jokeType" className="text-gray-300">
              <MessageSquare className="mr-2 inline-block h-4 w-4" />
              Type of Joke
            </Label>
            <Select value={jokeType} onValueChange={setJokeType}>
              <SelectTrigger
                id="jokeType"
                className="border-gray-700 bg-gray-800 text-gray-100"
              >
                <SelectValue placeholder="Select joke type" />
              </SelectTrigger>
              <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                <SelectItem value="one-liner">One-liner</SelectItem>
                <SelectItem value="pun">Pun</SelectItem>
                <SelectItem value="knock-knock">Knock-knock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature" className="text-gray-300">
              <Thermometer className="mr-2 inline-block h-4 w-4" />
              Temperature: {temperature}
            </Label>
            <Slider
              id="temperature"
              min={0}
              max={2}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
              className="bg-gray-800"
            />
          </div>

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isGenerateDisabled}
            onClick={generateJoke}
          >
            <Zap className="mr-2 h-4 w-4" />
            Generate Joke
          </Button>
        </div>

        <div className="space-y-6">
          {generatedJoke ? (
            <div className="flex h-full flex-col rounded-lg bg-gray-800 p-4">
              <p className="mb-4 flex-grow text-xl font-medium text-gray-200">
                {generatedJoke}
              </p>
              {!evaluation && (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => evaluateJoke()}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Evaluate Joke
                </Button>
              )}
              {evaluation && (
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant={evaluation === "funny" ? "default" : "outline"}
                    className={
                      evaluation === "funny"
                        ? "flex-1 bg-green-600 hover:bg-green-700"
                        : "flex-1 bg-gray-400"
                    }
                  >
                    <Smile className="mr-2 h-4 w-4" />
                    Funny
                  </Button>
                  <Button
                    variant={
                      evaluation === "appropriate" ? "default" : "outline"
                    }
                    className={
                      evaluation === "appropriate"
                        ? "flex-1 bg-blue-600 hover:bg-blue-700"
                        : "flex-1 bg-gray-400 disabled:bg-gray-300"
                    }
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Appropriate
                  </Button>
                  <Button
                    variant={evaluation === "offensive" ? "default" : "outline"}
                    className={
                      evaluation === "offensive"
                        ? "flex-1 bg-red-600 hover:bg-red-700"
                        : "flex-1 bg-gray-400 disabled:bg-gray-300"
                    }
                  >
                    <X className="mr-2 h-4 w-4" />
                    Offensive
                  </Button>
                </div>
              )}
              {aiMessage && (
                <div className="mt-4 flex items-start rounded-lg bg-gray-700 p-3">
                  <Bot className="mr-2 mt-1 h-5 w-5 text-purple-400" />
                  <p className="text-sm text-gray-200">{aiMessage}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg bg-gray-800 p-4">
              <p className="text-xl text-gray-400">
                Your generated joke will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
