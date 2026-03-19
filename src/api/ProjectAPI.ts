import type { ProjectFormData } from "@/types/index"
import api from "@/lib/axios"
import { isAxiosError } from "axios"

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData)
        return data
    } catch (error) {
        // Si el error de este tipo exacto existe, retorna el error
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}