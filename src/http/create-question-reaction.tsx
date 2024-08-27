interface CreateQuestionReactionRequest {
  roomId: string;
  questionId: string;
}

export async function createQuestionReaction({ roomId, questionId }: CreateQuestionReactionRequest) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${questionId}/react`, {
    method: 'PATCH',
  });
}
