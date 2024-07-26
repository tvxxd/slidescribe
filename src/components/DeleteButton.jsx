import Trash from "../icons/Trash";
import { deleteNotes } from "../supabase/apiNotes";
export default function DeleteButton({ noteId, setNotes }) {
  async function handleDelete(e) {
    await deleteNotes(noteId);
    setNotes((prevState) => prevState.filter((note) => note.id !== noteId));
  }

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
}
