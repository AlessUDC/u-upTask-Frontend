import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth()

  // Usamos useMemo() para que solo use data y note para que verifique si el usuario autenticado es el creador de la nota
  // no obstante useMemo() depende únicamente de data.
  // data siempre se va pasar, pero note no, y cuando se recargue la página, note no se va pasar, por lo que useMemo() no se va ejecutar
  // he aquí la importancia de pasar solo data como dependencia
  const canDelete = useMemo(() => data?._id === note.createdBy._id ,[data])

  const params = useParams()
  const projectId = params.projectId!
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data),
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  if(isLoading) return 'Cargando...'
  
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-800 font-bold">
          {formatDate(note.createdAt)}
        </p>
      </div>

      {canDelete && (
        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 p-2 text-white uppercase font-bold text-xs transition-colors"
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  )
}
