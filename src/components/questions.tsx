import { useParams } from "react-router-dom";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { getRoomQuestions, GetRoomQuestionsResponse } from "../http/get-room-questions";

import { Question } from "./question";
import { useEffect } from "react";

export function Questions() {
  // Hooks
  const queryClient = useQueryClient();
  const { roomId } = useParams();

  if (!roomId) throw new Error('QuestionList component must be used inside a Room component')

  const { data } = useSuspenseQuery({
    queryKey: ['questions', roomId],
    queryFn: () => getRoomQuestions({ roomId }),
  })

  // Constants
  const { questions } = data;

  // Effects
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    ws.onopen = () => {
      console.log('Websocket connected!')
    }

    ws.onclose = () => {
      console.log('Websocket connection closed!')
    }

    ws.onmessage = (event) => {
      const data: {
        kind: 'message_created' | 'message_answered' | 'message_reaction_increased' | 'message_reaction_decreased',
        value: any
      } = JSON.parse(event.data);

      switch(data.kind) {
        case 'message_created':
          queryClient.setQueryData<GetRoomQuestionsResponse>(['questions', roomId], state => {
            return {
              questions: [
                ...(state?.questions ?? []),
                {
                  id: data.value.id,
                  text: data.value.message,
                  amountOfReactions: 0,
                  answered: false
                }
              ],
            }
          })
        break;

        case 'message_answered':
          queryClient.setQueryData<GetRoomQuestionsResponse>(['questions', roomId], state => {
            if (!state) return undefined;

            return {
              questions: state.questions.map(question => {
                if (question.id === data.value.id) {
                  return { ...question, answered: true }
                }

                return question
              })
            }
          })
        break;

        case 'message_reaction_decreased':
        case 'message_reaction_increased':
          queryClient.setQueryData<GetRoomQuestionsResponse>(['questions', roomId], state => {
            if (!state) return undefined;

            return {
              questions: state.questions.map(question => {
                if (question.id === data.value.id) {
                  return { ...question, amountOfReactions: data.value.count }
                }

                return question
              })
            }
          })
        break;
      }
    }

    return () => {
      ws.close()
    }
  }, [roomId, queryClient])

  // Renders
  return (
    <ol className='list-decimal list-outside px-3 space-y-8'>
      {questions.map(question => (
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
