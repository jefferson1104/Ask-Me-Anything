interface GetRoomQuestionsRequest {
  roomId: string;
}

interface IQuestion {
  id: string;
  text: string;
  amountOfReactions: number;
  answered: boolean;
}

interface GetRoomQuestionsResponse {
  questions: IQuestion[];
}

export async function getRoomQuestions({ roomId }: GetRoomQuestionsRequest): Promise<GetRoomQuestionsResponse> {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`)

  const data: Array<{
    ID: string
    RoomID: string
    Message: string
    ReactionCount: number
    Answered: boolean
  }> = await response.json()

  return {
    questions: data.map(item => {
      return {
        id: item.ID,
        text: item.Message,
        amountOfReactions: item.ReactionCount,
        answered: item.Answered
      }
    })
  }
}
