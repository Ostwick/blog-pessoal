import { getGlobalData } from '../../utils/global-data';
import { getPostBySlug } from '../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';

const components = {
  a: CustomLink, // Define o componente de link personalizado
  Head, // Define o componente Head para a configuração de SEO
};

export default function PostPage({ post, globalData }) {
  // Verifica se o post existe antes de renderizar
  if (!post) {
    return (
      <Layout>
        <h1>Post não encontrado</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={`${post.title} - ${globalData.name}`} description={post.description} />
      <Header name={globalData.name} />

      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {post?.title}
          </h1>
          {post?.description && (
            <p className="text-xl mb-4">{post?.description}</p>
          )}
        </header>

        <main>
          <article className="prose dark:prose-dark">
            {/* Renderiza o conteúdo MDX */}
            <MDXRemote {...post.body} components={components} />
          </article>
        </main>

        <div className="mt-8 text-center">
          <Link href="/posts">
            <a className="text-lg text-primary hover:underline">
              <ArrowIcon className="inline-block mr-2" /> Voltar para os posts
            </a>
          </Link>
        </div>
      </article>

      <Footer copyrightText={globalData.footerText} />

      <GradientBackground variant="large" className="absolute -top-32 opacity-30 dark:opacity-50" />
      <GradientBackground variant="small" className="absolute bottom-0 opacity-20 dark:opacity-10" />
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  try {
    // Obtém os dados globais
    const globalData = getGlobalData();
    
    // Obtém o post baseado no slug (id)
    const post = await getPostBySlug(params.id);

    // Verifica se o post existe antes de retornar os dados
    if (!post) {
      return {
        notFound: true, // Retorna 404 caso o post não seja encontrado
      };
    }

    return {
      props: {
        globalData,
        post,
      },
    };
  } catch (error) {
    console.error('Erro ao carregar o post:', error);
    return {
      notFound: true, // Retorna 404 em caso de erro
    };
  }
};
