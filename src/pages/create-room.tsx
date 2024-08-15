/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'

import { createRoom } from '../http/create-room'

import amaLogo from '../assets/ama-logo.svg'


function CreateRoom() {
  // Hooks
  const navigate = useNavigate()

  // States
  const [createRoomIsLoading, setCreateRoomIsLoading] = useState(true)

  // Methods
  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) return;

    try {
      setCreateRoomIsLoading(true);
      const { roomId } = await createRoom({ theme })

      navigate(`/room/${roomId}`)
    } catch (error: any) {
      console.error('handleCreateRoom() Error: ', error)
      toast.error('An error occurred while creating the room.')
    } finally {
      setCreateRoomIsLoading(false);
    }
  }

  // Renders
  return (
    <main className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[450px] flex flex-col gap-6'>
        <img src={amaLogo} alt="AMA" className='h-10' />

        <p className='leading-relaxed text-zinc-300 text-center'>
          Create a public AMA (Ask me anything) room and prioritize the most important questions for the community.
        </p>

        <form
          action={handleCreateRoom}
          className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'
        >
          <input
            type='text'
            name='theme'
            placeholder='Room name'
            autoComplete='off'
            required
            className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
          />

          <button
            type='submit'
            disabled={createRoomIsLoading}
            className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors duration-300 disabled:cursor-not-allowed'
          >
            {createRoomIsLoading ? 'Creating...' : 'Create Room'}
            {createRoomIsLoading ? (<LoaderIcon className='size-4 animate-spin' />) : (<ArrowRight className='size-4' />)}
          </button>
        </form>
      </div>
    </main>
  )
}

export default CreateRoom
