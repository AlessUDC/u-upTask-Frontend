import AddNoteForm from "./AddNoteForm";
import type { Task } from "@/types/index";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Task['notes']
}

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <>
      <AddNoteForm />

      <div className="divide-y divide-gray-100 mt-10">
        {notes.length ? (
            <>
                <p className="text-2xl font-bold text-slate-600 my-5">Notas:</p>
                {notes.map(note => (
                    <NoteDetail key={note._id} note={note} />
                ))}
            </>
        ) : (
            <p className="text-center text-gray-500 my-10">No hay notas</p>
        )}
      </div>
    </>
  )
}
