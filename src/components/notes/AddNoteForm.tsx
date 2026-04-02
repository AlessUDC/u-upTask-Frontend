import { useForm } from "react-hook-form"
import type { NoteFormData } from "@/types/index"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {
  const params = useParams()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!           // Con params extraemos el projectId de la URL
  const taskId = queryParams.get('viewTask')!   // Con queryParams y useLocation() extraemos el taskId de la URL

  const initialValues: NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()   // Limpiar el formulario si el servidor responde correctamente
      // Invalidamos el query del contenedor de la tarea para que se actualice
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    mutate({ formData, projectId, taskId })
    // reset() , aquí se reinicia el formulario inmediatamente después de enviar la petición
    // puede estar aquí para formularios rápidos, y UX 'optimistic UI' donse se asume un éxito inmediato
  }

  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-bold">Crear Nota</label>
            <input 
                type="text"
                id="content"
                placeholder='Contenido de la nota'
                className='w-full p-3 border border-gray-300'
                {...register('content', {
                    required: 'El contenido de la nota es obligatorio'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>

        <input 
            type="submit"
            value='Crear Nota'
            className='w-full p-2 text-white bg-fuchsia-600 hover:bg-fuchsia-700 font-black cursor-pointer'
        />
    </form>
  )
}
