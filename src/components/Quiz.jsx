import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import BadgeNotification from './BadgeNoti';
// import '../App.css';
import '../index.css';


const Quiz = () => {
  const [quizData, setQuizData] = useState(null);  // quiz data from API
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);  // Shuffled questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // Current question tracking
  const [score, setScore] = useState(0);    // User's score
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);   // Quiz completion flag

  const [loading, setLoading] = useState(true);  // Loading indicator
  const [error, setError] = useState(null);  // Error handling
  const [isQuizStarted, setIsQuizStarted] = useState(false);  // Quiz start status
  const [selectedOption, setSelectedOption] = useState(null);  // Selected answer

  const [timeLeft, setTimeLeft] = useState(10 * 60);  // 10 minutes in seconds
  const [countdown, setCountdown] = useState(null);  // 3-2-1 countdown

  // Achievement States with LocalStorage Integration
  const [badges, setBadges] = useState(() => {
    // Initialize badges from localStorage or empty array
    const savedBadges = localStorage.getItem('quizBadges');
    return savedBadges ? JSON.parse(savedBadges) : [];
  });

  const [quizzesCompleted, setQuizzesCompleted] = useState(() => {
    // Initialize completed quizzes count from localStorage
    const savedCount = localStorage.getItem('quizzesCompleted');
    return savedCount ? parseInt(savedCount) : 0;
  });
  const [newBadge, setNewBadge] = useState(null);  // Latest badge earned
  const [answeredQuestions, setAnsweredQuestions] = useState([]);  // Question history
  // Add audio state
  const [correctSound, setCorrectSound] = useState(null);
  const [incorrectSound, setIncorrectSound] = useState(null);
  
  // Badge System Definition
  const badgeRequirements = [
    { id: 1, name: 'Quiz Novice', description: 'Completed 1 quiz', requiredQuizzes: 1 },
    { id: 2, name: 'Quiz Challenger', description: 'Completed 5 quizzes', requiredQuizzes: 5 },
    { id: 3, name: 'Quiz Expert', description: 'Completed 15 quizzes', requiredQuizzes: 15 },
    { id: 4, name: 'Quiz Master', description: 'Completed 25 quizzes', requiredQuizzes: 25 }
  ];
  
  // Question Randomization Function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // to fetch quiz data from API
        const response = await fetch('http://localhost:5000/api/quiz');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Transform data to handle markdown formatting
        const transformedData = {
          title: data.title,
          questions: data.questions.map(q => ({
            ...q,
            detailed_solution: q.detailed_solution
              .replace(/\*\*(.*?)\*\*/g, '**$1**')  // Preserve bold
              .replace(/\*(.*?)\*/g, '*$1*')        // Preserve italics
          }))
        };

        setQuizData(transformedData);
        setRandomizedQuestions(shuffleArray([...transformedData.questions]));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setError('Failed to load quiz data.');
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);  // Empty dependency array means this runs once on mount

  useEffect(() => {
    const correctAudio = new Audio('/sounds/correct.mp3');
    const incorrectAudio = new Audio('/sounds/incorrect.mp3');
    setCorrectSound(correctAudio);
    setIncorrectSound(incorrectAudio);

    return () => {
      correctAudio.pause();
      incorrectAudio.pause();
    };
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
  
  useEffect(() => {
    // Check for newly unlocked badges
    const unlockedBadges = badgeRequirements.filter(badge => 
      quizzesCompleted >= badge.requiredQuizzes && 
      !badges.find(b => b.id === badge.id)
    );
    
    if (unlockedBadges.length > 0) {
      setBadges(prev => {
        const newBadges = [...prev, ...unlockedBadges];
        localStorage.setItem('quizBadges', JSON.stringify(newBadges));
        return newBadges;
      });
      setNewBadge(unlockedBadges[0]);
    }
  }, [quizzesCompleted, badges]);
  
  // Time Formatting Function
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    // Converts seconds to MM:SS format
  };
  
   // Quiz Start Function
  const startQuiz = () => {
    setCountdown(3);
    
    // Handle 3-2-1 countdown animation
    const countdownInterval = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount === 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    // Start quiz after countdown
    setTimeout(() => {
      setRandomizedQuestions(shuffleArray([...quizData.questions]));
      setIsQuizStarted(true);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedOption(null);
      setTimeLeft(10 * 60); // Reset timer to 10 minutes
    }, 3000);
  };
  
  // Countdown Animation Component
  const CountdownAnimation = ({ count }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <span className="animate-bounce text-9xl font-bold text-white">
          {count}
        </span>
      </div>
    );
  };

  // Answer Handling Function
  const handleAnswer = (option) => {
    setSelectedOption(option);
    
    if (option.is_correct) {
      correctSound?.play();
    } else {
      incorrectSound?.play();
    }

    // Delay to show correct/incorrect answer
    setTimeout(() => {
      const currentQuestion = randomizedQuestions[currentQuestionIndex];
      const isCorrect = option.is_correct;
      
      // Update score if answer is correct
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      // Store question and answer details
      setAnsweredQuestions(prev => [...prev, {
        question: currentQuestion.description,
        userAnswer: option.description,
        correctAnswer: currentQuestion.options.find(o => o.is_correct)?.description,
        solution: currentQuestion.detailed_solution, 
        isCorrect
      }]);
      
      // Move to next question or end quiz
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < randomizedQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedOption(null);
      } else {
        setIsQuizCompleted(true);
        // Update quizzes completed count and persist
        setQuizzesCompleted(prev => {
          const newCount = prev + 1;
          localStorage.setItem('quizzesCompleted', newCount);
          return newCount;
        });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-purple-300 flex items-center justify-center p-4 overflow-hidden">
      {/* Countdown overlay if active */}
      {countdown !== null && <CountdownAnimation count={countdown} />}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        {/* Quiz Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold text-white">
              {quizData.title}
            </h1>
            {/* Timer display when quiz is active */}
            {isQuizStarted && !isQuizCompleted && (
              <div className={`text-white font-bold text-xl ${timeLeft < 60 ? 'animate-pulse text-red-300' : ''}`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
            )}
          </div>
        </div>
        
         {/* Quiz Content */}
        <div className="p-6">
          {!isQuizStarted ? (
            // Start Screen
            <div className="text-center">
              <p className="mb-4 text-xl text-gray-600">You have 10 minutes to complete the quiz</p>
              <button
                onClick={startQuiz}
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:cursor-pointer 
                hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
                >
                🚀 Start Quiz
              </button>
            </div>
          ) : isQuizCompleted || timeLeft === 0 ? (
            // Results Screen
            <Result 
            score={score} 
            totalQuestions={randomizedQuestions.length} 
              quizTitle={quizData.title}
              timeLeft={timeLeft}
              badges={badges}
              answeredQuestions={answeredQuestions}
              onRetake={() => {
                setIsQuizStarted(false);
                setIsQuizCompleted(false);
                setCurrentQuestionIndex(0);
                setScore(0);
                setSelectedOption(null);
                setTimeLeft(10 * 60);
                setAnsweredQuestions([]);
              }}
              />
            ) : (
              // Question Screen
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
      {/* Badge Notification */}
      {newBadge && (
        <BadgeNotification 
        badge={newBadge} 
        onClose={() => setNewBadge(null)} 
        />
      )}
    </div>
  );  
};

export default Quiz;