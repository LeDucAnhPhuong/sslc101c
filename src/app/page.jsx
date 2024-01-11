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
    "(A",
    "(B",
    "(C",
    "(D",
    "(E",
    "(F",
  ];
  const [isSubmit, setSubmit] = useState(false);
  const [sum, setSum] = useState(false);
  const [DATABASE, setdata] = useState([]);
  const [test, setTest] = useState({
    isTest: false,
    numberQuestion: 20,
  });
  // useEffect(() => {
  //   setdata(DATA.sort(() => Math.random() - 0.5));
  // }, []);
  return (
    <main className="flex bg-[#f5f5f5] gap-[20px] w-full px-[20px] min-h-screen flex-col items-center justify-between p-24">
      <div className="p-[10px_20px] flex items-center  justify-center w-full bg-[#fff] rounded-[18px]">
        <div className="outline-0 overflow-hidden w-[75%] p-[10px_20px_10px_0] h-full rounded-[18px_0_0_18px] border-r-[1px] border-[2px] border-[solid] border-[#000] text-[#000]">
          <input
            className="outline-0 w-[110%] translate-x-[20px]"
            onChange={({ target }) => {
              setTest({
                ...test,
                numberQuestion: target.value,
              });
            }}
            type="number"
            min="20"
            max="396"
            defaultValue={20}
          />
        </div>
        <button
          onClick={() => {
            setTest({
              ...test,
              isTest: !test.isTest,
            });
            if (!test.isTest) {
              setdata(DATA.sort(() => Math.random() - 0.5));
              setSubmit(false);
            }
          }}
          className="p-[10px_20px] bg-[#0000005f] rounded-[0_18px_18px_0] h-full border-[2px] border-l-[1px] border-[solid] border-[#000] text-[#fff]"
        >
          Start
        </button>
      </div>
      <div className="gap-[10px] flex flex-col items-center">
        {test.isTest &&
          (isSubmit
            ? DATABASE?.slice(0, test.numberQuestion).map((data, index) => {
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
                    trueAnswer.some(
                      (e) => answer.toUpperCase().slice(0, 2) === e
                    )
                  );
                return (
                  <li
                    key={data?.id}
                    className="p-[20px] rounded-[10px] w-full bg-[#fff]"
                  >
                    <div className="flex flex-col gap-[5px] items-start">
                      <h3 className="text-[#000]">{index}.</h3>
                      {question.map((ques, index) => (
                        <>
                          <h5 key={index} className="text-[#000]">
                            {ques}
                          </h5>
                        </>
                      ))}
                    </div>
                    <div className="ml-[10px] mt-[20px] flex flex-col items-start">
                      {answerArray.map((ans, index) => {
                        const isTrueAnswer = correctAnswer.some((e) =>
                          ans.toLowerCase().includes(e.toLowerCase())
                        );
                        return (
                          <div
                            key={ans}
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
            : DATABASE?.slice(0, test.numberQuestion).map((data, index) => {
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
                    trueAnswer.some(
                      (e) => answer.toUpperCase().slice(0, 2) === e
                    )
                  );
                return (
                  <li
                    key={data?.id}
                    className="p-[20px] rounded-[10px] w-full bg-[#fff]"
                  >
                    <div className="flex flex-col gap-[5px] items-start">
                      <h3 className="text-[#000] font-[700]">{index}.</h3>
                      {question.map((ques, index) => (
                        <>
                          <h5 key={index} className="text-[#000]">
                            {ques}
                          </h5>
                        </>
                      ))}
                    </div>
                    <div className="ml-[10px] mt-[20px]  flex flex-col items-start">
                      {answerArray
                        .sort(() => Math.random() - 0.5)
                        .map((ans, index) => {
                          return (
                            <div
                              key={ans}
                              className="flex gap-[10px] cursor-pointer  items-center"
                            >
                              <input
                                type="checkbox"
                                id={data.id + `${index}`}
                                className="cursor-pointer"
                              ></input>
                              <label
                                className={`text-[#000] cursor-pointer
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
              }))}
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
