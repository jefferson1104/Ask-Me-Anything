import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowRight, Share2 } from 'lucide-react'

import { Questions } from '../components/questions'

import amaLogo from '../assets/ama-logo.svg'

function Room () {
  // Hooks
  const { roomId } = useParams()

  // Methods
  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url})
    } else {
      navigator.clipboard.writeText(url)
      toast.info('Room URL copied to clipboard')
    }
  }

  // Renders
  return (
    <div className='mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4'>
      {/* Header */}
      <div className='flex items-center justify-center gap-3 px-3'>
        <img src={amaLogo} alt='AMA' className='h-5' />

        <span className='text-sm text-zinc-500 truncate'>
          Room code: <span className='text-zinc-300'>{roomId}</span>
        </span>

        <button type='submit' onClick={handleShareRoom} className='ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors duration-300'>
          Share
          <Share2 className='size-4' />
        </button>
      </div>

      {/* Divisor */}
      <div className='h-px w-full bg-zinc-900' />

      {/* Create questions form */}
      <form
        action={() => console.log('teste')}
        className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'
      >
        <input
          type='text'
          name='theme'
          placeholder='Whats is your question?'
          autoComplete='off'
          className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
        />

        <button type='submit' className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors duration-300'>
          Create question
          <ArrowRight className='size-4' />
        </button>
      </form>

      {/* Questions list */}
      <Suspense fallback={<p>Loading...</p>}>
        <Questions />
      </Suspense>
    </div>
  )
}

export default Room
