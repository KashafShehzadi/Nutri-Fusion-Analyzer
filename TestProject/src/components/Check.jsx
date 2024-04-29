// import React, { useState, useEffect } from 'react';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const Check = () => {
//   const [generatedText, setGeneratedText] = useState('');
//   const [foodItem1, setFoodItem1] = useState('');
//   const [foodItem2, setFoodItem2] = useState('');
//   const [optionalContext, setOptionalContext] = useState('');

  
//   const genAI = new GoogleGenerativeAI('AIzaSyBbyoqQGCYnh_0joEeBMvjTdGeULkzCx6Y');
//      const handleFoodChange1 = (event) => setFoodItem1(event.target.value);
//    const handleFoodChange2 = (event) => setFoodItem2(event.target.value);
//    const handleContextChange = (event) => setOptionalContext(event.target.value);

  
//   const handleAnalyzeClick = async () => {
//       // For text-only input, use the gemini-pro model
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const prompt = `
//               Analyze the following food combination, providing a comprehensive Nutri-Fusion Breakdown:
      
//               **Food Item 1:** {foodItem1}
//               **Food Item 2:** {foodItem2}
//               **Optional Context:** {optionalContext}
      
//               **Nutri-Fusion Breakdown:**
      
//               * Synergy Score: [1-10, indicating potential positive interactions]
//               * Nutrient Highlights:
//                 * Food Item 1: [Key nutrients and benefits]
//                 * Food Item 2: [Key nutrients and benefits]
//                 * Combined Impact: [How nutrients complement or enhance each other]
//               * Potential Interactions:
//                 * Positive: [Beneficial interactions]
//                 * Neutral: [Neutral interactions]
//                 * Negative: [Potential negative interactions, with severity levels]
//               * Overall Recommendation: [Recommend, suggest modifications, or advise against]
//             `;

//             const formattedPrompt = prompt
//                      .replace('{foodItem1}', foodItem1)
//                      .replace('{foodItem2}', foodItem2)
//                      .replace('{optionalContext}', optionalContext);
//       const result = await model.generateContent(formattedPrompt);
//       const response = await result.response;
//       const text = await response.text();
//       setGeneratedText(text);
//     }
  
//    // Run only once when the component mounts

//   return (
//     <div>
//       {/* Render the generated text inside the div */}
//       <div className="nutri-analyzer">
//     <h1>Analyze Food Combinations</h1>
//      <div className="input-fields">
//        <input
//           type="text"
//           placeholder="Food Item 1"
//           value={foodItem1}
//           onChange={handleFoodChange1}
//         />
//         <input
//           type="text"
//           placeholder="Food Item 2"
//           value={foodItem2}
//           onChange={handleFoodChange2}
//         />
//         <input
//           type="text"
//           placeholder="Optional Context (e.g., meal type, dietary restrictions)"
//           value={optionalContext}
//           onChange={handleContextChange}
//         />
//       </div>
//       <button onClick={handleAnalyzeClick} >
//       yes
//       </button>
      
     
//         <div className="analysis-result">
//           <h2>Nutri-Fusion Breakdown:</h2>
//           <p>{generatedText}</p>
//         </div>
    
//     </div>
  
//     </div>
//   );
// }

// export default Check;



import React, { useState, useEffect } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';

function Check() {
  
  const [foodItem1, setFoodItem1] = useState('');
  const [foodItem2, setFoodItem2] = useState('');
  const [optionalContext, setOptionalContext] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  


  const genAI = new GoogleGenerativeAI('AIzaSyBbyoqQGCYnh_0joEeBMvjTdGeULkzCx6Y');

  const handleFoodChange1 = (event) => setFoodItem1(event.target.value);
  const handleFoodChange2 = (event) => setFoodItem2(event.target.value);
  const handleContextChange = (event) => setOptionalContext(event.target.value);

  const handleAnalyzeClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const promptTemplate = `
        Analyze the following food combination, providing a comprehensive Nutri-Fusion Breakdown:

        Food Item 1: {food_item_1}
        Food Item 2: {food_item_2}
        Optional Context: {optional_context}

        **Nutri-Fusion Breakdown:**

        * Synergy Score: [1-10, indicating potential positive interactions]
        * Nutrient Highlights:
          * Food Item 1: [Key nutrients and benefits]
          * Food Item 2: [Key nutrients and benefits]
          * Combined Impact: [How nutrients complement or enhance each other]
        * Potential Interactions:
          * Positive: [Beneficial interactions]
          * Neutral: [Neutral interactions]
          * Negative: [Potential negative interactions, with severity levels]
        * Overall Recommendation: [Recommend, suggest modifications, or advise against]
      `;

      const formattedPrompt = promptTemplate
        .replace('{food_item_1}', foodItem1)
        .replace('{food_item_2}', foodItem2)
        .replace('{optional_context}', optionalContext);

        const model = genAI.getGenerativeModel({ model: "gemini-pro"});


const result = await model.generateContent(formattedPrompt);
      const response = await result.response;
      const text = await response.text();
      console.log(response)
      setAnalysisResult(response.text);
    } catch (error) {
      console.error('Error fetching response:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nutri-analyzer">
      <h1>Analyze Food Combinations</h1>
      <div className="input-fields">
        <input
          type="text"
          placeholder="Food Item 1"
          value={foodItem1}
          onChange={handleFoodChange1}
        />
        <input
          type="text"
          placeholder="Food Item 2"
          value={foodItem2}
          onChange={handleFoodChange2}
        />
        <input
          type="text"
          placeholder="Optional Context (e.g., meal type, dietary restrictions)"
          value={optionalContext}
          onChange={handleContextChange}
        />
      </div>
      <button onClick={handleAnalyzeClick} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && <p className="error">{error}</p>}
      {analysisResult && (
        <div className="analysis-result">
          <h2>Nutri-Fusion Breakdown:</h2>
          <p dangerouslySetInnerHTML={{ __html: analysisResult }} />
        </div>
      )}
    </div>
  );
}

export default Check;
