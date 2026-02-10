import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { predictImage } from "../services/api";

const WebcamPredictor = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
        setPrediction(null);
        setError(null);
      } else {
        setError("Camera not ready. Please wait a moment.");
      }
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
    setPrediction(null);
    setError(null);
    setIsCameraReady(false); // Reset ready state for re-mount
  };

  const handlePredict = async () => {
    if (!imgSrc) return;

    setLoading(true);
    setError(null);

    try {
      // Convert base64 to blob
      const res = await fetch(imgSrc);
      const blob = await res.blob();

      const data = await predictImage(blob);
      setPrediction(data);
    } catch (err) {
      setError("Failed to process image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Live Detection</h2>
          <p className="text-gray-600">Capture a gesture to translate it instantly.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Camera/Image Section */}
          <div className="glass-card p-4 rounded-2xl relative">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center shadow-inner">
              {imgSrc ? (
                <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
              ) : (
                <>
                  {!isCameraReady && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
                      <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                  )}
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    videoConstraints={{ facingMode: "user" }}
                    onUserMedia={() => setIsCameraReady(true)}
                    onUserMediaError={(err) => setError("Could not access camera: " + err.message)}
                  />
                </>
              )}
            </div>

            <div className="flex justify-center mt-6 gap-4">
              {!imgSrc ? (
                <button
                  onClick={capture}
                  disabled={!isCameraReady}
                  className={`px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2 ${!isCameraReady ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Capture
                </button>
              ) : (
                <>
                  <button
                    onClick={retake}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Retake
                  </button>
                  <button
                    onClick={handlePredict}
                    disabled={loading}
                    className={`px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 hover:-translate-y-0.5 transition-all flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Analysing...
                      </>
                    ) : (
                      <>
                        <span>Translate</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center min-h-[300px] text-center border-l-4 border-blue-500">
            {prediction ? (
              <div className="animate-slide-up">
                <h3 className="text-gray-500 font-medium tracking-wide uppercase mb-4">Prediction</h3>
                <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                  {prediction.predicted_letter}
                </div>
                <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Confidence: High
                </div>
              </div>
            ) : error ? (
              <div className="text-red-500 bg-red-50 p-4 rounded-xl">
                <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            ) : (
              <div className="text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <p>Output will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamPredictor;
