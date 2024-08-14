import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface QuestionProps {
  text: string;
  amountOfLikes: number;
  answered?: boolean
}


export function Question({ text, amountOfLikes, answered = false }: QuestionProps) {
  // States
  const [hasLiked, setHasLiked] = useState(false)

  // Methods
  function handleReactQuestion() {
    setHasLiked(true)
  }

  // Renders
  return (
    <li data-answered={answered} className='ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none'>
      {text}

      {hasLiked ? (
        <button type='button' className='mt-3 flex items-center gap-2 text-orange-400 hover:text-orange-500 text-sm font-medium'>
          <ArrowUp className='size-4' />
          Like question ({amountOfLikes})
        </button>
      ) : (
        <button type='button' onClick={handleReactQuestion} className='mt-3 flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium'>
          <ArrowUp className='size-4' />
          Like question ({amountOfLikes})
        </button>
      )}
    </li>
  )
}
