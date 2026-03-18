import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis Proyectos</h1>
      <p className="mt-5 text-2xl font-light text-gray-500">
        Maneja y administra tus proyectos
      </p>

      <nav className="my-5">
        <Link
          className="cursor-pointer rounded-lg bg-purple-400 px-10 py-3 text-xl font-bold text-white transition-colors hover:bg-purple-500"
          to="/projects/create"
        >
          Nuevo Proyecto
        </Link>
      </nav>
    </>
  );
}
