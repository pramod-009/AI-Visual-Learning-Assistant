import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyC6xKb2DG1I8UyTHb-o7nig_cu6crKDIvQ');

export async function analyzeImage(imageData: string) {
  if (!imageData) {
    throw new Error('No image data provided');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = "You are a helpful teaching assistant. Please analyze this image of a problem and provide a clear, step-by-step solution. If it's a math problem, explain the concepts and show the work. If it's a science question, explain the principles involved.";
    
    const base64Data = imageData.includes('base64,') 
      ? imageData.split(',')[1] 
      : imageData;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('No response from AI model');
    }

    return text;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze image';
    console.error('Error analyzing image:', errorMessage);
    throw new Error(errorMessage);
  }
}