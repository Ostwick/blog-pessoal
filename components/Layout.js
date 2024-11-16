import { useEffect } from 'react';

export function GradientBackground({ variant, className }) {
  // Define as classes de fundo gradiente com base na variante fornecida
  const gradientClasses = variant === 'large' 
    ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
    : 'bg-gradient-to-t from-pink-500 to-yellow-600';
  
  return (
    <div className={`${gradientClasses} ${className} absolute inset-0`} />
  );
}

export default function Layout({ children }) {
  // Função para configurar o tema com base nas preferências do usuário ou sistema
  const setAppTheme = () => {
    const theme = localStorage.getItem('theme');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  };

  // Função para lidar com a mudança de tema do sistema
  const handleSystemThemeChange = () => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
  };

  // Hook useEffect para aplicar o tema inicial com base nas preferências salvas
  useEffect(() => {
    setAppTheme();
  }, []);

  // Hook useEffect para ouvir as mudanças do tema do sistema
  useEffect(() => {
    handleSystemThemeChange();
  }, []);

  return (
    <div className="relative pb-24 overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Container centralizado */}
      <div className="flex flex-col items-center max-w-3xl w-full mx-auto px-4">
        {children}
      </div>
    </div>
  );
}
