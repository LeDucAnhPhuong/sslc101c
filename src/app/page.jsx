"use client";
import Image from "next/image";
import { DATA } from "../../data/data";
import { useEffect, useState } from "react";
export default function Home() {
  const trueAnswer = [
    "A.",
    "B.",
    "C.",
    "D.",
    "E.",
    "F.",
    "G.",
    "H.",
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "(a)",
    "(b)",
    "(c)",
    "(d)",
    "(e)",
    "(f)",
  ];
  const [isSubmit, setSubmit] = useState(false);
  const [DATABASE, setdata] = useState([]);
  useEffect(() => {
    setdata(DATA.sort(() => Math.random() - 0.5));
  }, []);
  return (
    <main className="flex bg-[#f5f5f5]  w-full px-[20px] min-h-screen flex-col items-center justify-between p-24">
      <div className="gap-[10px] flex flex-col items-center">
        {isSubmit
          ? DATABASE?.map((data, index) => {
              const content =
                data.cardSides[1]?.media[0]?.plainText?.split("\n");
              const question = [
                content[0],
                content
                  .slice(1, content.length)
                  .filter(
                    (answer) =>
                      !trueAnswer.some(
                        (e) => answer.toUpperCase().slice(0, 2) === e
                      )
                  ),
              ];
              const correctAnswer =
                data.cardSides[0]?.media[0]?.plainText?.split("\n");
              const answerArray = content
                .slice(1, content.length)
                .filter((answer) =>
                  trueAnswer.some((e) => answer.toUpperCase().slice(0, 2) === e)
                );
              return (
                <li
                  key={data?.id}
                  className="p-[20px] rounded-[10px] w-full bg-[#fff]"
                >
                  <div className="flex flex-col gap-[5px] items-start">
                    {question.map((ques, index) => (
                      <h5 key={index} className="text-[#000]">
                        {ques}
                      </h5>
                    ))}
                  </div>
                  <div className="ml-[10px] mt-[20px] flex flex-col items-start">
                    {answerArray.map((ans, index) => {
                      const isTrueAnswer = correctAnswer.some((e) =>
                        ans.toLowerCase().includes(e.toLowerCase())
                      );
                      return (
                        <div
                          key={index}
                          className="flex gap-[10px] items-center"
                        >
                          <input
                            type="checkbox"
                            id={data.id + `${index}`}
                          ></input>
                          <label
                            className={`${
                              isTrueAnswer ? "text-[#008000]" : "text-[#000]"
                            }`}
                            htmlFor={data.id + `${index}`}
                          >
                            {ans}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })
          : DATABASE?.map((data, index) => {
              const content =
                data.cardSides[1]?.media[0]?.plainText?.split("\n");
              const question = [
                content[0],
                content
                  .slice(1, content.length)
                  .filter(
                    (answer) =>
                      !trueAnswer.some(
                        (e) => answer.toUpperCase().slice(0, 2) === e
                      )
                  ),
              ];
              const answerArray = content
                .slice(1, content.length)
                .filter((answer) =>
                  trueAnswer.some((e) => answer.toUpperCase().slice(0, 2) === e)
                );
              return (
                <li
                  key={data?.id}
                  className="p-[20px] rounded-[10px] w-full bg-[#fff]"
                >
                  <div className="flex flex-col gap-[5px] items-start">
                    {question.map((ques, index) => (
                      <h5 key={index} className="text-[#000]">
                        {ques}
                      </h5>
                    ))}
                  </div>
                  <div className="ml-[10px] mt-[20px] flex flex-col items-start">
                    {answerArray?.map((ans, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-[10px] items-center"
                        >
                          <input
                            type="checkbox"
                            id={data.id + `${index}`}
                          ></input>
                          <label
                            className={`text-[#000]
                            }`}
                            htmlFor={data.id + `${index}`}
                          >
                            {ans}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
      </div>
      <button
        onClick={() => {
          setSubmit(true);
        }}
        className="p-[20px_50px] bg-[#202020] mt-[20px] rounded-[20px]"
      >
        Submit
      </button>
    </main>
  );
}
