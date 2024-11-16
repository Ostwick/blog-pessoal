import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 pt-16 pb-12 text-white">
      {/* Logo (ícone circular) */}
      <div className="w-24 h-24 rounded-full block mx-auto mb-6 bg-gradient-conic from-gradient-3 to-gradient-4 shadow-lg">
        {/* Aqui você pode adicionar uma imagem de logo se necessário */}
      </div>

      {/* Nome do blog com link */}
      <p className="text-3xl font-bold text-center mb-4">
        <Link href="/">
          <a className="hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 ease-in-out">{name}</a>
        </Link>
      </p>

      {/* Navegação do header */}
      <nav className="flex justify-center space-x-6">
        <Link href="/posts">
          <a className="text-lg hover:text-yellow-300 transition duration-200 ease-in-out">Posts</a>
        </Link>
        <Link href="/about">
          <a className="text-lg hover:text-yellow-300 transition duration-200 ease-in-out">Sobre</a>
        </Link>
        <Link href="/contact">
          <a className="text-lg hover:text-yellow-300 transition duration-200 ease-in-out">Contato</a>
        </Link>
      </nav>
    </header>
  );
}
