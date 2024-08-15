import { IQuestion } from "../interfaces/question";

interface GetRoomQuestionsRequest {
  roomId: string;
}

export async function getRoomQuestions({ roomId }: GetRoomQuestionsRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`)

  const data: Array<{
    ID: string
    RoomID: string
    Message: string
    ReactionCount: number
    Answered: boolean
  }> = await response.json()

  const questions: IQuestion[] = data.map(item => {
    return {
      id: item.ID,
      roomId: item.RoomID,
      text: item.Message,
      amountOfLikes: item.ReactionCount,
      answered: item.Answered
    }
  })

  return { questions }
}
