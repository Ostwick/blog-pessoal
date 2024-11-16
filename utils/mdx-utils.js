import { api } from '../services/api';

export const getPosts = async () => {
  const { data } = await api.get('/posts');

  if (data) {
    return data;
  }

  return [];
};

// Função para buscar um post específico pelo ID
export const getPostBySlug = async (id) => {
  try {
    const { data } = await api.get(`/posts?id=eq.${id}`);

    // Verifica se o dado foi retornado e retorna o primeiro post encontrado (já que o filtro pode retornar um array)
    if (data && data.length > 0) {
      return data[0];  // Retorna o primeiro post que corresponde ao ID
    }

    // Retorna um objeto vazio se não encontrar nenhum post
    return {};
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return {};
  }
};
