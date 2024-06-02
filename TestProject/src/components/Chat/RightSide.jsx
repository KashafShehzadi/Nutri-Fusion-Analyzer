import React, { useState, useEffect } from "react";
import { HiOutlineExclamation, HiOutlineLightningBolt, HiOutlineSun } from "react-icons/hi";
import { RiSendPlane2Line } from "react-icons/ri";
import axios from 'axios';

const RightSide = ({ selectedPair, results, setResults }) => {
  const [foodItem1, setFoodItem1] = useState('');
  const [foodItem2, setFoodItem2] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedPair) {

      if (selectedPair.analysisResult) {
        setResults({
          food1BreakDown: selectedPair.analysisResult.food1BreakDown[0],
          food2BreakDown: selectedPair.analysisResult.food2BreakDown[0],
          overallResult: selectedPair.analysisResult.OverallResult.parts[0].text
        });
      }
    }
  }, [selectedPair]);

  const handleFoodChange1 = (event) => setFoodItem1(event.target.value);
  const handleFoodChange2 = (event) => setFoodItem2(event.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!foodItem1 || !foodItem2) {
      setError("Both food fields are required.");
      return;
    }

    try {
      await handleAnalyzeClick();
      setFoodItem1('');
      setFoodItem2('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAnalyzeClick = async () => {
    setResults(null);
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/analyze/analyzeChat', { foodItem1, foodItem2 });
      const data = response.data;
      //console.log(data); // Debugging: log the response data
      if (data.newResult) {
        setResults({
          food1BreakDown: data.newResult.food1BreakDown[0],
          food2BreakDown: data.newResult.food2BreakDown[0],
          overallResult: data.newResult.OverallResult.parts[0].text
        });
      }
      else {
        setError("Unexpected response structure");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex h-screen flex-1 flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1 bg-slate-900">
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col items-center text-sm h-screen md:h-screen">
            <div className="text-gray-800 w-full ml-9 md:h-full md:flex md:flex-col">
              <h1 className={` ${results ? "text-xl font-semibold mt-4 text-myCustomColor" : "text-myCustomColor text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16"} `}>
                Nutri-Fusion Analyzer
              </h1>

              <div className="md:flex w-full items-start gap-3.5">
                {results ? (
                  <div className="w-[90%] mx-7 flex-shrink-0 h-96 overflow-y-scroll mt-4 text-white scrollbar-thumb-slate-700 scrollbar border-myCustomColor rounded border-2">
                    <div>
                      <h2 className="text-xl font-semibold">Food 1 Breakdown:</h2>
                      <pre>{results.food1BreakDown.name}</pre>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Food 2 Breakdown:</h2>
                      <pre>{results.food2BreakDown.name}</pre>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Final Result</h2>
                      <pre>{results.overallResult}</pre>
                    </div>
                  </div>
                ) : (
                  [
                    {
                      icon: <HiOutlineSun className="text-myCustomColor" />,
                      title: "Examples",
                      subTitle: [`Tell the best food pairings for your meal`],
                      hover: true,
                    },
                    {
                      icon: <HiOutlineLightningBolt className="text-myCustomColor" />,
                      title: "Capabilities",
                      subTitle: [`Remembers what user said earlier in the conversation`],
                      hover: false,
                    },
                    {
                      icon: <HiOutlineExclamation className="text-myCustomColor" />,
                      title: "Limitations",
                      subTitle: [`May occasionally generate incorrect information`],
                      hover: false,
                    },
                  ].map((item, index) => (
                    <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1" key={index}>
                      <h2 className="flex gap-3 text-gray-100 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                        {item.icon}
                        {item.title}
                      </h2>
                      <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                        {item.subTitle.map((subTitle, subTitleIndex) => (
                          <button
                            className={`w-full bg-gray-50 text-gray-100 bg-white/5 p-3 rounded-md ${item.hover ? " dark:hover:bg-gray-900 cursor-pointer" : "cursor-text"}`}
                            key={subTitleIndex}
                          >
                            {subTitle}
                          </button>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-gray-800 md:!bg-transparent">
          <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6" onSubmit={handleFormSubmit}>
            <div className="relative flex h-full flex-1 flex-row">
              <div className="h-[8vh] flex flex-row justify-evenly w-full pl-1 flex-grow relative bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
                <input
                  tabIndex="0"
                  data-id="root"
                  rows="1"
                  value={foodItem1}
                  required
                  onChange={handleFoodChange1}
                  placeholder="Enter First Food"
                  className="w-full cursor-text resize-none bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none overflow-y-hidden"
                ></input>
              </div>
              <div className="flex ml-2 flex-row justify-evenly w-full pl-1 flex-grow relative bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
                <input
                  tabIndex="0"
                  data-id="root"
                  rows="1"
                  required
                  value={foodItem2}
                  onChange={handleFoodChange2}
                  placeholder="Enter Second Food"
                  className="w-full cursor-text resize-none bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none overflow-y-hidden"
                ></input>
              </div>
              <div className="flex ml-2 flex-row justify-evenly bg-myCustomColor w-24 py-2 pl-1 flex-grow md:py-3 md:pl-4 relative dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
                <button
                  type="submit"
                  className={`absolute p-1 rounded-md ${isLoading ? ' text-gray-500 cursor-not-allowed' : 'text-white'} bottom-1.5 right-1 text-xl md:bottom-2.5 md:right-2 hover:text-2xl`}
                  disabled={isLoading}
                >
                  <RiSendPlane2Line />
                </button>
              </div>
            </div>
          </form>
          <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-100/50 md:px-4 md:pt-3 md:pb-6">
            Nutri-Fusion
            &nbsp;Created by KF teams
          </div>
        </div>
      </main>
    </div>
  );
};

export default RightSide;
