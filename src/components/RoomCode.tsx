import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string,
} 

export function RoomCode(props: RoomCodeProps) {
  function codeRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }
  
  return (
    <button className="room-code" onClick={codeRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  )
}