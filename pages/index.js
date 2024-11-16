import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import { useState } from 'react';

export default function Index({ posts, globalData }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtra os posts com base na consulta de pesquisa
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>

        {/* Barra de pesquisa */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Buscar posts..."
            className="p-2 border border-gray-300 rounded-lg w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Exibe os posts filtrados */}
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link as={`/posts/${post.id}`} href={`/posts/${post.id}`}>
                <a className="block">
                  {post.created_at && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {post.created_at}
                    </p>
                  )}
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {post.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4 text-blue-500" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer copyrightText={globalData.footerText} />

      {/* Gradiente de fundo */}
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export async function getStaticProps() {
  // Busca os posts e dados globais
  const posts = await getPosts();
  const globalData = getGlobalData();

  // Retorna os dados como props
  return {
    props: { posts, globalData },
    revalidate: 60, // Revalida a cada 60 segundos (pode ser ajustado)
  };
}
