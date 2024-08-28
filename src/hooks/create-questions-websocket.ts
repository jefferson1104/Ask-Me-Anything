import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { GetRoomQuestionsResponse } from "../http/get-room-questions";

interface UseQuestionsWebsocketsParams {
  roomId: string
}

type WebhookMessage =
  | {kind: "message_created", value: { id: string, message: string }}
  | {kind: "message_answered", value: { id: string }}
  | {kind: "message_reaction_increased", value: { id: string, count: number }}
  | {kind: "message_reaction_decreased", value: { id: string, count: number }}

export function useQuestionsWebSockets ({
  roomId
}: UseQuestionsWebsocketsParams) {
  // Hooks
  const queryClient = useQueryClient()

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
      const data: WebhookMessage = JSON.parse(event.data);

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
}
