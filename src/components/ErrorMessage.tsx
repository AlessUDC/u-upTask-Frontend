import React from "react"

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center my-4 bg-red-100 p-3 text-red-600 font-bold text-sm rounded-lg uppercase">
        {children}
    </div>
  )
}
