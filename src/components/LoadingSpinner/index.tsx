import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  loadingTime?: number; // Make loadingTime optional
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loadingTime = 10 }) => {
  const [count, setCount] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(timer); // Clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    if (count === loadingTime) {
      //clearInterval(); // Error: Expected 1 argument, but got 0
      setLoadingComplete(true);
      // Perform any action when loading is completed
    }
  }, [count, loadingTime]);

  return !loadingComplete ? (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      <div className="mt-4 text-xl font-semibold text-gray-900">Loading...</div>
      <div className="mt-2 text-gray-700">{`Time remaining: ${loadingTime - count} seconds`}</div>
    </div>
  ) : null;
};
