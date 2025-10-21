import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Summary from "./Summary";
import Question from "./Question";

export type UserAnswer = string | null;

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer: UserAnswer) => {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
