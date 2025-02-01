import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Question from './Question';
import Result from './Result';
import '../App.css';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quiz');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setQuizData(data);
        setRandomizedQuestions(shuffleArray([...data.questions]));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setError('Failed to load quiz data.');
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  useEffect(() => {
    let timer;
    if (isQuizStarted && !isQuizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizStarted, isQuizCompleted, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount === 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prevCount - 1;
      });
    }, 1000);
  
    setTimeout(() => {
      setRandomizedQuestions(shuffleArray([...quizData.questions]));
      setIsQuizStarted(true);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedOption(null);
      setTimeLeft(10 * 60);
    }, 3000);
  };

  const CountdownAnimation = ({ count }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <span className="animate-bounce text-9xl font-bold text-white">
          {count}
        </span>
      </div>
    );
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    
    setTimeout(() => {
      if (option.is_correct) {
        setScore(score + 1);
      }
      
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < randomizedQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedOption(null);
      } else {
        setIsQuizCompleted(true);
      }
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
          <p className="text-purple-700 text-lg">Loading Quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 overflow-hidden">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl text-red-600 font-bold mb-4">Oops!</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4 overflow-hidden">
      {countdown !== null && <CountdownAnimation count={countdown} />}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              {quizData.title}
            </h1>
            {isQuizStarted && !isQuizCompleted && (
              <div className={`text-white font-bold text-xl ${timeLeft < 60 ? 'animate-pulse text-red-300' : ''}`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {!isQuizStarted ? (
            <div className="text-center">
              <p className="mb-4 text-xl text-gray-600">You have 10 minutes to complete the quiz</p>
              <button
                onClick={startQuiz}
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg 
                         hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
              >
                🚀 Start Quiz
              </button>
            </div>
          ) : isQuizCompleted || timeLeft === 0 ? (
            <Result 
              score={score} 
              totalQuestions={randomizedQuestions.length} 
              quizTitle={quizData.title}
              timeLeft={timeLeft}
            />
          ) : (
            <Question
              question={randomizedQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={randomizedQuestions.length}
              selectedOption={selectedOption}
            />
          )}
        </div>
      </div>
    </div>
  );  
};

export default Quiz;