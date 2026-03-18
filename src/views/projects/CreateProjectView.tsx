import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {
  const initialValues : ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  }

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({ defaultValues: initialValues })

  const handleForm = (data: ProjectFormData) => {
    createProject(data)
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el formulario para crear un proyecto
        </p>

        <nav className="my-5">
          <Link
            className="cursor-pointer rounded-lg bg-purple-400 px-10 py-3 text-xl font-bold text-white transition-colors hover:bg-purple-500"
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
            value="Crear Proyecto"
            className="w-full cursor-pointer bg-fuchsia-600 p-3 font-bold uppercase text-white transition-colors hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  )
}
