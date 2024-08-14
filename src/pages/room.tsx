import { useParams } from "react-router-dom"

function Room () {
  // Hooks
  const { roomId } = useParams()

  // Renders
  return (
    <h1>Room: {roomId}</h1>
  )
}

export default Room
