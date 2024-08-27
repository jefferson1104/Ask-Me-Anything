import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowUp } from 'lucide-react';

import { createQuestionReaction } from '../http/create-question-reaction';
import { removeQuestionReaction } from '../http/remove-question-reaction';

interface QuestionProps {
  questionId: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean
}

export function Question({ questionId, text, amountOfReactions, answered = false }: QuestionProps) {
  // Hooks
  const { roomId } = useParams();

  if (!roomId) throw new Error('QuestionList component must be used inside a Room component')

  // States
  const [hasReacted, setHasReacted] = useState(false)

  // Methods
  async function createQuestionReactionAction() {
    if (!roomId) return

    try {
      await createQuestionReaction({ questionId, roomId })
      setHasReacted(true);
    } catch (error) {
      console.error('createQuestionReactionAction() Error: ', error)
      toast.error('Failed to like question, please try again!');
    }
  }

  async function removeQuestionReactionAction() {
    if (!roomId) return

    try {
      await removeQuestionReaction({ questionId, roomId })
      setHasReacted(false);
    } catch (error) {
      console.error('removeQuestionReactionAction() Error: ', error)
      toast.error('Failed to remove like, please try again!');
    }
  }

  // Renders
  return (
    <li data-answered={answered} className='ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none'>
      {text}

      {hasReacted ? (
        <button
          type='button'
          onClick={removeQuestionReactionAction}
          className='mt-3 flex items-center gap-2 text-orange-400 hover:text-orange-500 text-sm font-medium'
        >
          <ArrowUp className='size-4' />
          Like question ({amountOfReactions})
        </button>
      ) : (
        <button
          type='button'
          onClick={createQuestionReactionAction}
          className='mt-3 flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium'
        >
          <ArrowUp className='size-4' />
          Like question ({amountOfReactions})
        </button>
      )}
    </li>
  )
}
