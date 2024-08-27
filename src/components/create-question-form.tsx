import { useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { createQuestion } from "../http/create-question";
import { toast } from "sonner";


export function CreateQuestionForm() {
  // Hooks
  const { roomId } = useParams();

  if (!roomId) throw new Error('Create Question Form component must be used inside a Room component')

  // Methods
  async function createQuestionAction(data: FormData) {
    const question = data.get('question') as string;

    if (!question || !roomId) return;

    try {
      await createQuestion({ roomId, question });

    } catch (error) {
      console.error('createQuestionAction() Error: ', JSON.stringify(error))
      toast.error('An error occurred while creating the question');

    }
  }


  // Renders
  return (
    <form
      action={createQuestionAction}
      className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'
    >
      <input
        required
        type='text'
        name='question'
        placeholder='Whats is your question?'
        autoComplete='off'
        className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
      />

      <button type='submit' className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors duration-300'>
        Create question
        <ArrowRight className='size-4' />
      </button>
    </form>
  )
}
