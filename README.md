
# Quiz App

## Overview
A modern, feature-rich quiz application built with React and Tailwind CSS. The application offers an engaging quiz experience with timed sessions, badges, detailed solutions, and visual feedback for answers.

## Key Features
- **Timed Quizzes**: 10-minute time limit per quiz session with visual countdown
- **Interactive UI**: 
  - Smooth transitions and animations
  - Visual feedback for correct/incorrect answers
  - Countdown animation before quiz start
  - Responsive design for all screen sizes

- **Achievement System**:
  - Progressive badge system (Novice to Master levels)
  - Visual trophy display with different colors
  - Real-time badge notifications
  - Persistent achievements across sessions

- **Detailed Results**:
  - Comprehensive score summary
  - Question-by-question review
  - Detailed explanations for all answers
  - Success messages based on performance
  - Markdown support for rich text solutions

- **Progress Tracking**:
  - Question counter
  - Score calculation
  - Performance percentage
  - Quiz completion history

## Technical Features
- Local storage integration for persistent data
- Question randomization for varied experience
- Markdown rendering for rich text content
- SVG filter effects for badges
- Error handling and loading states
- Modular component architecture

## Installation

1. Clone the repository:
   
   git clone <repository-url>
   cd quiz-app

2. Install dependencies:

   npm install

3. Required dependencies:
 
   {
      "react": "^18.x",
      "react-markdown": "^x.x",
      "rehype-raw": "^x.x",
      "tailwindcss": "^4.x"
   }

4. Start the development server:

   npm run dev


## Badge System
The application includes four achievement levels:
- Quiz Novice (1 quiz completed)
- Quiz Challenger (5 quizzes completed)
- Quiz Expert (15 quizzes completed)
- Quiz Master (25 quizzes completed)

## Component Structure
- `Quiz.jsx`: Main quiz controller component
- `Question.jsx`: Individual question display
- `Result.jsx`: Quiz results and solutions
- `BadgeNotification.jsx`: Achievement notifications
- `SolutionRenderer.jsx`: Markdown solution renderer
- `BadgeHelper.js`: Badge styling utilities

## Styling
The application uses Tailwind CSS for styling with:
- Responsive design patterns
- Gradient backgrounds
- Interactive animations
- Custom color schemes
- Shadow effects

## Local Storage
The application persists:
- Earned badges
- Number of completed quizzes
- Achievement progress