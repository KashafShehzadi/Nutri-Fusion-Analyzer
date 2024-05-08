// Import necessary modules and setup your express app
import express from 'express';
import dotenv from  'dotenv'
import { UserQuery } from "../models/UserQuery.js"
import { GoogleGenerativeAI } from '@google/generative-ai' 
dotenv.config()//to load env variables

const router = express.Router();



router.post('/analyzChat', async (req, res) => {
    const { foodItem1, foodItem2 } = req.body;
    try {
       
        const { analysisResult} = await performAnalysis(foodItem1, foodItem2);
        const f1=await fetchNutritionData(foodItem1)
        const f2=await fetchNutritionData(foodItem2)
        const newResult={
            food1BreakDown:f1,
            food2BreakDown:f2,
            OverallResult:analysisResult }



        // Save user query and analysis result to your database
        const userQuery = new UserQuery({
            userId:req.userId ,// Assuming you have authentication middleware to get user information
            foodItem1,
            foodItem2,
            analysisResult: newResult 
        });
        await userQuery.save();
        // Send analysis result and food data back to the frontend
        return res.json({ status: true, message: "User query analyzed successfully", newResult});
        
    } catch (error) {
        console.error("Error analyzing user query:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const performAnalysis = async (foodItem1, foodItem2) => {
    try {

        const synergyScore = calculateSynergyScore(foodItem1, foodItem2);
        const analysisResult = await generateAnalysisResult(foodItem1, foodItem2, synergyScore);

        return { analysisResult};
    } catch (error) {
        console.error("Error performing analysis:", error);
        throw new Error("Error performing analysis");
    }
};
const fetchNutritionData = async (foodItem) => {
    try {
        // Fetch nutrition data from API for the given food item
        const nutritionAPIUrl = `https://api.api-ninjas.com/v1/nutrition?query=${foodItem}`;
        const nutritionResponse = await fetch(nutritionAPIUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': process.env.VITE_NUTRI,
                'Content-Type': 'application/json'
            },
        });

        if (!nutritionResponse.ok) {
            throw new Error('Error fetching nutrition data');
        }

        return await nutritionResponse.json();
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        throw new Error("Error fetching nutrition data");
    }
};
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

const genAI = new GoogleGenerativeAI(process.env.VITE_GEM);

const generateAnalysisResult = async (foodItem1, foodItem2, synergyScore) => {
    const formattedPrompt = promptTemplate
        .replace('{foodItem1}', foodItem1)
        .replace('{foodItem2}', foodItem2)
        .replace('{synergy_score}', synergyScore);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const generativeAIResponse = await model.generateContent(formattedPrompt);
    const generativeAIResult = await generativeAIResponse.response;
    const analysisText = generativeAIResult.candidates[0].content;
    return analysisText;
    
};
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
// Export your router
export { router as UserChat };
