import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getRoomQuestions } from "../http/get-room-questions";

import { Question } from "./question";

export function Questions() {
  // Hooks
  const { roomId } = useParams();

  if (!roomId) throw new Error('QuestionList component must be used inside a Room component')

  const { data } = useSuspenseQuery({
    queryKey: ['questions', roomId],
    queryFn: () => getRoomQuestions({ roomId }),
  })

  // Constants
  const { questions } = data;

  // Renders
  return (
    <ol className='list-decimal list-outside px-3 space-y-8'>
      {questions.map(question => (
        <Question
          key={question.id}
          text={question.text}
          amountOfLikes={question.amountOfLikes}
          answered={question.answered}
        />
      ))}
    </ol>
  )
}
