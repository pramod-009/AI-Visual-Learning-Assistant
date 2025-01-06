import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, Loader2 } from 'lucide-react';
import { analyzeImage } from '../lib/gemini';

export function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [solution, setSolution] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');
  const [isCameraReady, setIsCameraReady] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };

  const handleUserMedia = () => {
    setIsCameraReady(true);
    setError('');
  };

  const handleUserMediaError = () => {
    setError('Failed to access camera. Please make sure you have granted camera permissions.');
    setIsCameraReady(false);
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setIsAnalyzing(true);
    setError('');
    
    try {
      const result = await analyzeImage(imageSrc);
      setSolution(result);
    } catch (err) {
      setError('Failed to analyze the image. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [webcamRef]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          className="w-full h-full object-cover"
        />
        {isCameraReady && (
          <button
            onClick={capture}
            disabled={isAnalyzing}
            className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <CameraIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {solution && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Solution:</h2>
          <div className="prose max-w-none">
            {solution.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}