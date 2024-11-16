// Função para obter as variáveis de ambiente com valor padrão, caso estejam ausentes.
const getEnvVar = (key, defaultValue) => {
  const value = process.env[key];
  return value ? decodeURI(value) : defaultValue;
};

export const getGlobalData = () => {
  const name = getEnvVar('BLOG_NAME', 'Ostwick Blog');
  const blogTitle = getEnvVar('BLOG_TITLE', 'Blog em NextJS');
  const footerText = getEnvVar('BLOG_FOOTER_TEXT', 'All rights reserved.');

  // Retorna o objeto com os dados globais do site.
  return {
    name,
    blogTitle,
    footerText,
  };
};
