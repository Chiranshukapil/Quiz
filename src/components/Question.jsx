import React from 'react';

const Question = ({ 
  question, 
  onAnswer, 
  currentQuestion, 
  totalQuestions,
  selectedOption 
}) => {
  return (
    <div>
      <div className="flex justify-between mb-4 text-gray-600">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>Category: General</span>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {question.description}
      </h2>
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 
              ${selectedOption === null 
                ? 'bg-gray-100 hover:bg-indigo-100 hover:shadow-md hover:cursor-pointer' 
                : option.is_correct 
                  ? 'bg-green-100 border-2 border-green-500' 
                  : selectedOption !== option
                    ? 'bg-gray-100'
                    : 'bg-red-100 border-2 border-red-500'
              }`}
          >
            {option.description}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;