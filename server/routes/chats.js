// Import necessary modules and setup your express app
import express from 'express';
import dotenv from 'dotenv'
import { UserQuery } from "../models/UserQuery.js"
import { GoogleGenerativeAI } from '@google/generative-ai'
import { verifyUser } from '../middlewares/verifyUser.js';
dotenv.config()//to load env variables
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.VITE_GEM);

router.post('/analyzeChat', verifyUser, async (req, res) => {
    const { foodItem1, foodItem2 } = req.body;
    try {
        const f1 = await fetchNutritionData(foodItem1);
        const f2 = await fetchNutritionData(foodItem2);
        
        // Check if f1 or f2 is empty or does not contain any data
        if (!f1 || !f2 || Object.keys(f1).length === 0 || Object.keys(f2).length === 0) {
            return res.status(400).json({ status: false, message: "Invalid food item(s)" });
        }
        
        const { analysisResult } = await performAnalysis(foodItem1, foodItem2, f1, f2);
        const newResult = {
            food1BreakDown: f1,
            food2BreakDown: f2,
            OverallResult: analysisResult
        }
        // Save user query and analysis result to your database
        const userQuery = new UserQuery({
            userId: req.userId,// Assuming you have authentication middleware to get user information
            foodItem1,
            foodItem2,
            analysisResult: newResult
        });
        await userQuery.save();
        // Send analysis result and food data back to the frontend
        return res.json({ status: true, message: "User query analyzed successfully", newResult });

    } catch (error) {
        console.error("Error analyzing user query:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, message: "valid user" });
});

router.get('/userChatHistory', verifyUser, async (req, res) => {
    try {
        const userChats = await UserQuery.find({ userId: req.userId }).sort({ createdAt: -1 });
        return res.json({ status: true, message: "User chat history fetched successfully", data: userChats });
    } catch (error) {
        console.error("Error fetching user chat history:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

router.get('/getQuery/:id', verifyUser, async (req, res) => {
    try {
        const queryId = req.params.id;
        const userQuery = await UserQuery.findById(queryId);
        if (!userQuery) {
            return res.status(404).json({ status: false, message: "Query not found" });
        }
        return res.json({ status: true, message: "Query fetched successfully", data: userQuery });
    } catch (error) {
        console.error("Error fetching query:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

router.delete('/deleteQuery/:id', verifyUser, async (req, res) => {
    try {
        const queryId = req.params.id;
        const deletedQuery = await UserQuery.findByIdAndDelete(queryId);
        if (!deletedQuery) {
            return res.status(404).json({ status: false, message: "Query not found" });
        }
        return res.json({ status: true, message: "Query deleted successfully" });
    } catch (error) {
        console.error("Error deleting query:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

const performAnalysis = async (foodItem1, foodItem2, f1, f2) => {
    try {
        const analysisResult = await generateAnalysisResult(foodItem1, foodItem2);

        return { analysisResult };
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
Food Item 1: {foodItem1}
Food Item 2: {foodItem2}
<br>
Food Synergy Analysis:

    
        
        1.Nutrient Complementarity:[Nutrient Complementarity Score/10] [Describe how the foods complement each other nutritionally, enhancing absorption or providing a broader range of nutrients.]
        2.Digestive Compatibility:[ Digestive Compatibility score/10 ][Explain if the foods have similar digestion times and require similar stomach environments (acidity) for optimal digestion.]
        3.Medical Insights:[Medical Insights score/10] [Indicate if the combination aligns with Ayurvedic principles in english or is considered incompatible due to opposing energetic properties.]
        4.Synergy Score:> [how much the benefit of foods combination vs the individual food benefit] / 10 
        5.Overall Recommendation:
            
              **Ideal Combination:** Enjoy this pairing for optimal nutritional benefits and digestion.
              **Moderate Synergy:** This combination offers some benefits, but consider [suggest modifications] for improved digestion.
              **Limited Synergy:** Consume these foods in moderation or with a time gap between them to minimize digestive discomfort. Consider alternative pairings for optimal nutrition.
              **Not Recommended:** Avoid this combination to prevent potential digestive issues. Explore alternative pairings that synergize better.
            
          
        6.Quantity for Normal Digestion (if applicable):[Provide specific portion recommendations or guidelines based on individual factors like age, activity level, and overall dietary intake. Emphasize consulting a healthcare professional for personalized advice.] While a general recommendation might be [suggest a starting point], it's crucial to consult a healthcare professional or registered dietitian for personalized guidance on portion sizes that suit your individual needs and dietary goals.
        
    
    `;



const generateAnalysisResult = async (foodItem1, foodItem2) => {
    const formattedPrompt = promptTemplate.replace('{foodItem1}', foodItem1)
    .replace('{foodItem2}', foodItem2)

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const generativeAIResponse = await model.generateContent(formattedPrompt);
    const generativeAIResult = await generativeAIResponse.response;
    const analysisText = generativeAIResult.candidates[0].content;
    return analysisText;

};

// Export your router
export { router as UserChat };
