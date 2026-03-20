
import { useForm } from "react-hook-form"
import type { ProjectFormData } from "@/types/index"
import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { updateProject } from "@/api/ProjectAPI"
import { useMutation } from "@tanstack/react-query"
import type { Project } from "@/types/index"
import { toast } from "react-toastify"

type EditProjectFormProps = {
  data: ProjectFormData
  projectId: Project['_id']
}

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({ defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  }})

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    const data = {
        formData,
        projectId
    }
    mutate(data)
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el formulario para editar un proyecto
        </p>

        <nav className="my-5">
          <Link
            className="
              cursor-pointer rounded-lg bg-purple-400 px-10 py-3 text-xl font-bold 
              text-white transition-colors hover:bg-purple-500
            "
            to="/"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          className="mt-10 rounded-lg bg-white p-10 shadow-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm 
            register={register}
            errors={errors}
          />
          <input
            type="submit"
            value="Guardar Cambios"
            className="
              w-full cursor-pointer bg-fuchsia-600 p-3 font-bold uppercase 
              text-white transition-colors hover:bg-fuchsia-700
            "
          />
        </form>
      </div>
    </>
  )
}
