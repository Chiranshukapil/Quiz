import React from 'react';

const Result = ({ score, totalQuestions, quizTitle, timeLeft }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);
  
  const getResultMessage = () => {
    if (timeLeft === 0) return "Time's up! 🕒";
    if (percentage >= 90) return "Excellent! 🏆";
    if (percentage >= 70) return "Great job! 👍";
    if (percentage >= 50) return "Good effort! 👏";
    return "Keep practicing! 💪";
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">
        {getResultMessage()}
      </h2>
      
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
        <p className="text-xl text-gray-700 mb-2">
          {quizTitle} Results
        </p>
        <div className="text-4xl font-extrabold text-indigo-600 mb-4">
          {score} / {totalQuestions}
        </div>
        <p className="text-lg text-gray-600">
          You scored {percentage}% correct
        </p>
      </div>
      
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg 
                 hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
      >
        Retake Quiz
      </button>
    </div>
  );
};


export default Result;