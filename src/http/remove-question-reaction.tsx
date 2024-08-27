interface RemoveQuestionReactionRequest {
  roomId: string;
  questionId: string;
}

export async function removeQuestionReaction({ roomId, questionId }: RemoveQuestionReactionRequest) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${questionId}/react`, {
    method: 'DELETE',
  });
}
