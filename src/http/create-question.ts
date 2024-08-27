interface CreateQuestionRequest {
  roomId: string;
  question: string;
}

export async function createQuestion({ roomId, question }: CreateQuestionRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message: question }),
  });

  const data: { id: string } = await response.json();

  return {
    roomId: data.id
  }
}
