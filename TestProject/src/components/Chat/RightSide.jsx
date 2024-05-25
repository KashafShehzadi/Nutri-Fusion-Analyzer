import React, { useState, useEffect } from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";
import { RiSendPlane2Line, RiUserLine } from "react-icons/ri";
import axios from 'axios';

const RightSide = () => {
  const [foodItem1, setFoodItem1] = useState('');
  const [foodItem2, setFoodItem2] = useState('');
  const [results, setResults] = useState(null);
  //const [headingsAndContent, setHeadingsAndContent] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [nutrientComplementarity, setNutrientComplementarity] = useState('');
  const [digestiveCompatibility, setDigestiveCompatibility] = useState('');
  const [medicalInsights, setMedicalInsights] = useState('');
  const [synergyScore, setSynergyScore] = useState('');
  const [overallRecommendation, setOverallRecommendation] = useState('');
  const [quantityForNormalDigestion, setQuantityForNormalDigestion] = useState('');


  const handleFoodChange1 = (event) => setFoodItem1(event.target.value);
  const handleFoodChange2 = (event) => setFoodItem2(event.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if both foodItem1 and foodItem2 are not empty
    if (!foodItem1 || !foodItem2) {
      setError("Both food fields are required.");
      return;
    }
    // If both fields are filled, call handleAnalyzeClick to make the API call
    try {
      await handleAnalyzeClick(event);
    } catch (error) {
      setError(error.message);
    }
  };


  const handleAnalyzeClick = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/analyze/analyzeChat', {
        foodItem1,
        foodItem2
      });

      setResults(response.data)
      console.log(response.data)
      //const overallResultText = results ? results.newResult.OverallResult.parts[0].text : '';
    
    } catch (error) {
      setError(error.message);
    
    } finally {
      setIsLoading(false);
      console.log(1+1)
    }
  };


  useEffect(() => {
    if (results) {
      try {
        const overallResultText = results.newResult.OverallResult.parts[0].text;
  
        const patterns = [
          { heading: "Nutrient Complementarity", pattern: /Nutrient\s*Complementarity:\*\*\s*\[.*?\]\s*(.*?)(?=\d+\.\s*\*\*|$)/s },
          { heading: "Digestive Compatibility", pattern: /Digestive\s*Compatibility:\*\*\s*\[.*?\]\s*(.*?)(?=\d+\.\s*\*\*|$)/s },
          { heading: "Medical Insights", pattern: /Medical\s*Insights:\*\*\s*\[.*?\]\s*(.*?)(?=\d+\.\s*\*\*|$)/s },
          { heading: "Synergy Score", pattern: /Synergy\s*Score:\*\*\s*\[.*?\]\s*(.*?)(?=\d+\.\s*\*\*|$)/s },
          { heading: "Overall Recommendation", pattern: /Overall\s*Recommendation:\*\*\s*(.*?)(?=\d+\.\s*\*\*|$)/s },
          { heading: "Quantity for Normal Digestion", pattern: /Quantity\s*for\s*Normal\s*Digestion:\*\*\s*(.*?)(?=Consult\s*a\s*healthcare\s*professional|$)/s }
        ];
        
        
        
  
        const parsedData = patterns.reduce((accumulator, { heading, pattern }) => {
          const match = overallResultText.match(pattern);
          if (match) {
            accumulator[heading] = match[1].trim();
          }
          return accumulator;
        }, {});
  
        // Update states with parsed data
        setNutrientComplementarity(parsedData["Nutrient Complementarity"] || "");
        setDigestiveCompatibility(parsedData["Digestive Compatibility"] || "");
        setMedicalInsights(parsedData["Medical Insights"] || "");
        setSynergyScore(parsedData["Synergy Score"] || "");
        setOverallRecommendation(parsedData["Overall Recommendation"] || "");
        setQuantityForNormalDigestion(parsedData["Quantity for Normal Digestion"] || "");
      } catch (error) {
        setError(error.message);
      }
    }
  }, [results]);


console.log(nutrientComplementarity)


  


  //front end

  return (
    <div className="flex h-screen flex-1 flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1 bg-slate-900">
        <div className="flex-1 overflow-hidden ">
          <div className="flex flex-col items-center text-sm h-screen md:h-screen ">
            <div className="text-gray-800 bg-orange-900 w-full ml-9 md:h-full md:flex md:flex-col">
              <h1 className={` ${results ? "text-xl font-semibold  mt-4 text-myCustomColor" : "text-myCustomColor text-4xl  font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16"} `}>
                Nutri-Fusion Analyzer
              </h1>

              <div className="md:flex w-full items-start gap-3.5 bg-slate-400 ">
                {results ? (
                  <div className="w-full flex-shrink-0 h-96 overflow-auto mt-4 text-white  scrollbar-thumb-slate-700 scrollbar   border-myCustomColor rounded border-2 ">
                    <div>
                      <h2 className="text-xl font-semibold">Food 1 Breakdown:</h2>
                      <pre>{results.newResult.food1BreakDown[0].name}</pre>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Food 2 Breakdown:</h2>
                      <pre>{results.newResult.food2BreakDown[0].name}</pre>
                    </div>
                    <div className="bg-blue-300">
                      <h2 className="text-xl font-semibold">Overall Result:</h2>
                      <div className="flex flex-col gap-4">
                        <div  className="p-4 border rounded-md mb-2">
                          <h2 className="text-xl font-semibold">Nutrient Complementry</h2>
                          <p>{nutrientComplementarity}</p>
                        </div>
                        <div  className="p-4 border rounded-md mb-2">
                          <h2 className="text-xl font-semibold">Digestive Compatibility</h2>
                          <p>{digestiveCompatibility}</p>
                        </div>
                        <div  className="p-4 border rounded-md mb-2">
                          <h2 className="text-xl font-semibold">synergy Score</h2>
                          <p>{synergyScore}</p>
                        </div>
                        <div className="p-4 border rounded-md mb-2">
                          <h2 className="text-xl font-semibold">medical Insights</h2>
                          <p>{medicalInsights}</p>
                        </div>
                        <div className="p-4 border rounded-md mb-2">
                          <h2 className="text-xl font-semibold">Overall Recommendation</h2>
                          <p>{overallRecommendation}</p>
                        </div>
                        <div  className="p-4 border rounded-md mb-2">
                          <h2 className="text-xl font-semibold">Quantity ForNormal Digestion</h2>
                          <p>{quantityForNormalDigestion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  [
                    {
                      icon: <HiOutlineSun className="text-myCustomColor" />,
                      title: "Examples",
                      subTitle: [
                        `Tell the best food pairings for your meal`,
                      ],
                      hover: true,
                    },
                    {
                      icon: <HiOutlineLightningBolt className="text-myCustomColor" />,
                      title: "Capabilities",
                      subTitle: [
                        `Remembers what user said earlier in the conversation`,
                      ],
                      hover: false,
                    },
                    {
                      icon: <HiOutlineExclamation className="text-myCustomColor" />,
                      title: "Limitations",
                      subTitle: [
                        `May occasionally generate incorrect information`,
                      ],
                      hover: false,
                    },
                  ].map((item, index) => (
                    <div
                      className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1"
                      key={index}
                    >
                      <h2 className="flex gap-3 text-gray-100 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                        {item.icon}
                        {item.title}
                      </h2>
                      <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                        {item.subTitle.map((subTitle, subTitleIndex) => (
                          <button
                            className={`w-full bg-gray-50 text-gray-100 bg-white/5 p-3 rounded-md ${item.hover
                              ? " dark:hover:bg-gray-900 cursor-pointer"
                              : "cursor-text"
                              }`}
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
        {/* Input */}
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-gray-800 md:!bg-transparent">
          <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6" onSubmit={handleFormSubmit}>
            <div className="relative flex h-full flex-1 flex-row">

              <div className="h-[8vh] flex flex-row justify-evenly w-full pl-1 flex-grow  relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">


                <input
                  tabIndex="0"
                  data-id="root"
                  rows="1"
                  value={foodItem1}
                  required
                  onChange={handleFoodChange1}
                  placeholder="Enter First Food"
                  className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
                ></input>
              </div>
              <div className="flex ml-2 flex-row justify-evenly w-full pl-1 flex-grow  relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
                <input
                  tabIndex="0"
                  data-id="root"
                  rows="1"
                  required
                  value={foodItem2}
                  onChange={handleFoodChange2}
                  placeholder="Enter Second Food"
                  className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
                ></input>
              </div>
              <div className="flex ml-2  flex-row justify-evenly bg-myCustomColor w-24 py-2 pl-1 flex-grow md:py-3 md:pl-4 relative  dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">

                <button type="submit" className={`absolute p-1 rounded-md ${isLoading ? ' text-gray-500 cursor-not-allowed' : 'text-white'} bottom-1.5 right-1 text-xl md:bottom-2.5 md:right-2 hover:text-2xl`}
                  disabled={isLoading}>
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
