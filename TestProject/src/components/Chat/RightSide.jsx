import { React, useState } from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RiSendPlane2Line, RiUserLine } from "react-icons/ri";
import axios from 'axios';


const RightSide = () => {
  const [foodItem1, setFoodItem1] = useState('');
  const [foodItem2, setFoodItem2] = useState('');
  const [foodItem1Res, setRes1] = useState('');
  const [foodItem2Res, setRes2 ] = useState('');
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEM);
    const [optionalContext, setOptionalContext] = useState('');
  // const [analysisResult, setAnalysisResult] = useState('');
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleFoodChange1 = (event) => setFoodItem1(event.target.value);
  const handleFoodChange2 = (event) => setFoodItem2(event.target.value);
  const handleContextChange = (event) => setOptionalContext(event.target.value);


 


 

  // const handleAnalyzeClick = async (event) => {
  //     event.preventDefault();
  //     setError(null);
  //     setIsLoading(true);
  
  //     try {
  //         const response = await axios.post('http://localhost:3000/auth/analyze', {
  //             foodItem1,
  //             foodItem2,
  //         });
  
  //         const responseData = response.data;
  
  //         // Update state with the analysis results
  //         setAnalysisResults(responseData.analysisResult);
  //         setRes1(responseData.food1);
  //         setRes2(responseData.food2);
  //         console.log(responseData);
  //     } catch (error) {
  //         console.error('Error analyzing user query:', error);
  //         setError('An error occurred. Please try again later.');
  //     } finally {
  //         setIsLoading(false);
  //     }
  // };
  const calculateSynergyScore = (food1, food2) => {
    // Define factors to consider for synergy score calculation
    const beneficialFactors = ['protein', 'fiber', 'vitamins', 'minerals', 'antioxidants'];
    const harmfulFactors = ['saturated_fat', 'sodium', 'sugar'];

    // Calculate beneficial score based on nutrients that complement each other
    let beneficialScore = 0;
    beneficialFactors.forEach(factor => {
        if (food1[factor] && food2[factor]) {
            beneficialScore += food1[factor] + food2[factor];
        }
    });

    // Calculate harmful score based on nutrients that might interact negatively
    let harmfulScore = 0;
    harmfulFactors.forEach(factor => {
        if (food1[factor] && food2[factor]) {
            harmfulScore += food1[factor] + food2[factor];
        }
    });

    // Calculate overall synergy score
    const synergyScore = beneficialScore - harmfulScore;

    // Explanation based on the calculated score
    let synergyScoreExplanation = '';
    if (synergyScore >= 10) {
        synergyScoreExplanation = 'Excellent synergy - highly beneficial when consumed together';
    } else if (synergyScore >= 5 && synergyScore < 10) {
        synergyScoreExplanation = 'Good synergy - beneficial when consumed together';
    } else if (synergyScore >= 0 && synergyScore < 5) {
        synergyScoreExplanation = 'Moderate synergy - some benefits when consumed together';
    } else if (synergyScore < 0 && synergyScore >= -5) {
        synergyScoreExplanation = 'Fair synergy - neutral or minor negative effects when consumed together';
    } else {
        synergyScoreExplanation = 'Poor synergy - potential negative effects when consumed together';
    }

    return synergyScore;

};




  const handleAnalyzeClick = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    // Fetch from nutrition API for food item 1
    try {
      const query1 = `${foodItem1}`;
      const nutritionAPIUrl1 = `https://api.api-ninjas.com/v1/nutrition?query=${query1}`;
      const nutritionResponse1 = await fetch(nutritionAPIUrl1, {
        method: 'GET',
        headers: {
          'X-Api-Key': import.meta.env.VITE_NUTRI,
          'Content-Type': 'application/json'
        },
      });

      if (!nutritionResponse1.ok) {
        throw new Error('Error fetching nutrition data for food item 1');
      }

      const food1 = await nutritionResponse1.json();

      // Fetch from nutrition API for food item 2
      const query2 = `${foodItem2}`;
      const nutritionAPIUrl2 = `https://api.api-ninjas.com/v1/nutrition?query=${query2}`;
      const nutritionResponse2 = await fetch(nutritionAPIUrl2, {
        method: 'GET',
        headers: {
          'X-Api-Key': import.meta.env.VITE_NUTRI,
          'Content-Type': 'application/json'
        },
      });

      if (!nutritionResponse2.ok) {
        throw new Error('Error fetching nutrition data for food item 2');
      }

      const food2 = await nutritionResponse2.json();
      const { synergyScore, synergyScoreExplanation } = calculateSynergyScore(food1, food2);

      // Call generative AI
      //   const promptTemplate = `
      //   Analyze the following food combination, providing a comprehensive Nutri-Fusion Breakdown:

      //   Food Item 1: {food_item_1}
      //   Food Item 2: {food_item_2}
      //   Optional Context: {optional_context}

      //   *Nutri-Fusion Breakdown:*

      //   * Synergy Score: {synergy_score} / 10
      //     {synergy_score_explanation}
      //   * Nutrient Highlights:
      //     * Food Item 1: [Key nutrients and benefits]
      //     * Food Item 2: [Key nutrients and benefits]
      //     * Combined Impact: [How nutrients complement or enhance each other]
      //   * Potential Interactions:
      //     * Positive: [Beneficial interactions]
      //     * Neutral: [Neutral interactions]
      //     * Negative: [Potential negative interactions, with severity levels]
      //   * Overall Recommendation: [Recommend, suggest modifications, or advise against]
      // `;
      const promptTemplate = `
      <div class="">
      <div class="food-items">
        <p>Food Item 1: {foodItem1}</p>
        <p>Food Item 2: {foodItem2}</p>
      </div>
    
      <div>
        <h3 class=" font-bold text-2xl">Food Synergy Analysis:</h3>
        <h3><strong>Synergy Score:</strong> {synergy_score} / 10</h3>
        <ul>
          <li><strong>Nutrient Complementarity:</strong> [Describe how the foods complement each other nutritionally, enhancing absorption or providing a broader range of nutrients.]</li>
          <li><strong>Digestive Compatibility:</strong> [Explain if the foods have similar digestion times and require similar stomach environments (acidity) for optimal digestion.]</li>
          <li><strong>Medical Insights:</strong> [Indicate if the combination aligns with Ayurvedic principles in english or is considered incompatible due to opposing energetic properties.]</li>
          <br>
          <li><strong>Overall Recommendation:</strong>
            <ul>
              <li>**Ideal Combination:** Enjoy this pairing for optimal nutritional benefits and digestion.</li>
              <li>**Moderate Synergy:** This combination offers some benefits, but consider [suggest modifications] for improved digestion.</li>
              <li>**Limited Synergy:** Consume these foods in moderation or with a time gap between them to minimize digestive discomfort. Consider alternative pairings for optimal nutrition.</li>
              <li>**Not Recommended:** Avoid this combination to prevent potential digestive issues. Explore alternative pairings that synergize better.</li>
            </ul>
          </li>
          <li><strong>Quantity for Normal Digestion (if applicable):</strong> [Provide specific portion recommendations or guidelines based on individual factors like age, activity level, and overall dietary intake. Emphasize consulting a healthcare professional for personalized advice.] While a general recommendation might be [suggest a starting point], it's crucial to consult a healthcare professional or registered dietitian for personalized guidance on portion sizes that suit your individual needs and dietary goals.</li>
        </ul>
      </div>
    </div>
    
    `;
    const formattedPrompt = promptTemplate
        .replace('{foodItem1}', foodItem1)
        .replace('{foodItem2}', foodItem2)
        .replace('{optional_context}', optionalContext)
        .replace('{synergy_score}', synergyScore)
        .replace('{synergy_score_explanation}', synergyScoreExplanation);

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const generativeAIResponse = await model.generateContent(formattedPrompt);
      const generativeAIResult = await generativeAIResponse.response;

      // Combine results
      const analysisWithUserQuery = `
      <div class="pl-2">
      <div>
        <h2 class="text-xl font-semibold">User Query:</h2>
        <p>Food Item 1: ${foodItem1}</p>
        <p>Food Item 2: ${foodItem2}</p>
        <p>Optional Context: ${optionalContext}</p>
      </div>
      <div>
        <h2 class="text-xl font-semibold">Nutrition Analysis:</h2>
        <div class="flex flex-row ">${food1.map(food => (
        `<div key="${food.name}" class=" border w-1/3 ml-1  rounded pr-2   border-white">
             <p>Name: ${food.name}</p>
             <p>Calories: ${food.calories}</p>
             <p>Serving Size: ${food.serving_size_g}g</p>
             <p>Fat Total: ${food.fat_total_g}g</p>
             <p>Fat Saturated: ${food.fat_saturated_g}g</p>
             <p>Protein: ${food.protein_g}g</p>
             <p>Sodium: ${food.sodium_mg}mg</p>
             <p>Potassium: ${food.potassium_mg}mg</p>
             <p>Cholesterol: ${food.cholesterol_mg}mg</p>
             <p>Carbohydrates Total: ${food.carbohydrates_total_g}g</p>
             <p>Fiber: ${food.fiber_g}g</p>
             <p>Sugar: ${food.sugar_g}g</p>
             
           </div>`
      )).join('')}
      ${food2.map(food => (
        `<div key="${food.name}" class=" border w-1/3 ml-1 rounded pr-2  border-white">
             <p>Name: ${food.name}</p>
             <p>Calories: ${food.calories}</p>
             <p>Serving Size: ${food.serving_size_g}g</p>
             <p>Fat Total: ${food.fat_total_g}g</p>
             <p>Fat Saturated: ${food.fat_saturated_g}g</p>
             <p>Protein: ${food.protein_g}g</p>
             <p>Sodium: ${food.sodium_mg}mg</p>
             <p>Potassium: ${food.potassium_mg}mg</p>
             <p>Cholesterol: ${food.cholesterol_mg}mg</p>
             <p>Carbohydrates Total: ${food.carbohydrates_total_g}g</p>
             <p>Fiber: ${food.fiber_g}g</p>
             <p>Sugar: ${food.sugar_g}g</p>
            
           </div>`
      )).join('')}</div>
    <hr/>
        <h2 class="text-xl font-semibold">Nutri-Fusion Analysis:</h2>
        <p>${generativeAIResult.text()}</p>
        <hr/>
      </div>
      </div>
    `;

      setAnalysisResults([...analysisResults, analysisWithUserQuery]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };





  //front end
  
  return (
    <div className="flex h-full flex-1 flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col items-center text-sm h-full md:h-screen bg-slate-900">
            <div className="text-gray-800 w-full  md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6">
              <h1 className={` ${analysisResults ? "text-xl font-semibold  mt-4 text-myCustomColor" : "text-myCustomColor text-4xl  font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16"} `}>
                Nutri-Fusion Analyzer
              </h1>

              <div className="md:flex items-start gap-3.5 ">
                {analysisResults ? (
                  <div className="w-full flex-shrink-0 h-96 overflow-auto mt-4 text-white  scrollbar-thumb-slate-700 scrollbar   border-myCustomColor rounded border-2 ">
                    
                    <div  dangerouslySetInnerHTML={{ __html: analysisResults }} />
                    {/* {analysisResults.length > 0 &&
                      analysisResults.map((analysisResult, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: analysisResult }} />
                      ))} */}
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
          <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
            <div className="relative flex h-full flex-1 flex-row">

              <div className="h-[8vh] flex flex-row justify-evenly w-72 pl-1 flex-grow  relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">


                <input
                  tabIndex="0"
                  data-id="root"
                  rows="1"
                  value={foodItem1}
                  onChange={handleFoodChange1}
                  placeholder="Enter First Food"
                  className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
                ></input>
              </div>
              <div className="flex ml-2 flex-row justify-evenly w-72 pl-1 flex-grow  relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
                <input
                  tabIndex="0"
                  data-id="root"
                  rows="1"
                  value={foodItem2}
                  onChange={handleFoodChange2}
                  placeholder="Enter Second Food"
                  className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
                ></input>
              </div>
              <div className="flex ml-2  flex-row justify-evenly w-full py-2 pl-1 flex-grow md:py-3 md:pl-4 relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
                <input
                  tabIndex="0"
                  data-id="root"
                  rows="1"
                  value={optionalContext}
                  onChange={handleContextChange}
                  placeholder="Additional context related to Food"
                  className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
                ></input>
                <button className={`absolute p-1 rounded-md ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'text-myCustomColor'} bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-black`}
                  onClick={handleAnalyzeClick} disabled={isLoading}>
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
