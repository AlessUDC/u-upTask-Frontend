import axios from "axios"
import { isAxiosError } from "axios"
import {
    userSchema,
    type CheckPasswordForm,
    type ConfirmToken,
    type ForgotPasswordForm,
    type NewPasswordForm,
    type RequestConfirmationCodeForm,
    type UserLoginForm,
    type UserRegistrationForm
} from "@/types/index"
import api from "@/lib/axios"

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/create-account`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/confirm-account`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/request-code`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/login`
        const { data } = await axios.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/forgot-password`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/validate-token`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/update-password/${token}`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api.get('/auth/user')
        const response = userSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData: CheckPasswordForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/check-password`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}