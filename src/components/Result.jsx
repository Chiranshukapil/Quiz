import React from 'react';
import { getTrophyFilter } from './Badgehelper';
import SolutionRenderer from './SolutionRenderer';

const Result = ({ score, totalQuestions, quizTitle, timeLeft, badges, answeredQuestions, onRetake }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);
  
  const getResultMessage = () => {
    if (timeLeft === 0) return "Time's up! 🕒";
    if (percentage >= 90) return "Excellent! 🎖️";
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

      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Detailed Solutions</h3>
        <div className="space-y-8 text-left">
          {answeredQuestions.map((aq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex items-start mb-4">
                <div className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full ${aq.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {aq.isCorrect ? (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{aq.question}</h4>
              </div>
              
              <div className="ml-9">
                <div className="mb-3">
                  <span className="font-medium">Your answer:</span> 
                  <span className={`ml-2 ${aq.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {aq.userAnswer}
                  </span>
                </div>
                
                {!aq.isCorrect && (
                  <div className="mb-3">
                    <span className="font-medium">Correct answer:</span> 
                    <span className="ml-2 text-green-600">{aq.correctAnswer}</span>
                  </div>
                )}

                <div className="bg-indigo-50 p-4 rounded-lg mt-3">
                  <p className="font-medium text-indigo-600 mb-2">Explanation:</p>
                  <SolutionRenderer content={aq.solution} />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={onRetake}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:cursor-pointer 
                hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
      >
        Retake Quiz
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Badges</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {badges.map(badge => (
            <div key={badge.id} className="bg-indigo-50 p-4 rounded-lg w-48">
              <img
                src="/trophy.png"
                alt="Trophy"
                className={`w-16 h-16 mx-auto mb-2 ${getTrophyFilter(badge.id)}`}
              />
              <h4 className="font-bold">{badge.name}</h4>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
          {badges.length === 0 && (
            <p className="text-gray-500">Complete more quizzes to unlock badges!</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default Result;