import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import toast from 'react-hot-toast';

import { useHistory } from 'react-router';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function Home() {
  // const notify = () => toast('Here is your toast.');
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Está sala não existe 🙁")
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Está sala foi encerrada 🙁")
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
      <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" width="320px" height="320px" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text"
            placeholder="Digite o código da sala"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
            />
            <Button type="submit">Entra na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}