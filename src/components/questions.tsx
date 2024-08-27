import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getRoomQuestions } from "../http/get-room-questions";

import { useQuestionsWebSockets } from "../hooks/create-questions-websocket";

import { Question } from "./question";

export function Questions() {
  const { roomId } = useParams();

  if (!roomId) throw new Error('QuestionList component must be used inside a Room component')

  const { data } = useSuspenseQuery({
    queryKey: ['questions', roomId],
    queryFn: () => getRoomQuestions({ roomId }),
  })

  useQuestionsWebSockets({ roomId })

  const sortedQuestons = data.questions.sort((a,b) => {
    return b.amountOfReactions - a.amountOfReactions
  })

  // Renders
  return (
    <ol className='list-decimal list-outside px-3 space-y-8'>
      {sortedQuestons.map(question => (
        <Question
          key={question.id}
          questionId={question.id}
          text={question.text}
          amountOfReactions={question.amountOfReactions}
          answered={question.answered}
        />
      ))}
    </ol>
  )
}
