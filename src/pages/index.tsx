import Head from "next/head";
import { GetStaticProps } from "next";
import { getPostsForTopPage } from "lib/notionAPI";
import SinglePost from "components/Post/SinglePost";
import Link from "next/link";

// Next.jsのgetStaticProps関数を使用し、ビルド時に静的なプロパティを生成
// getStaticPropsは、ページがユーザーに表示される前に、必要なデータを事前に準備しておくための機能
export const getStaticProps: GetStaticProps = async () => {
  // getPostsForTopPage、トップページの投稿データを取得
  const numberOfPosts = await getPostsForTopPage();

  // ページコンポーネントに渡すプロパティを返却
  return {
    props: {
      numberOfPosts, // 取得した投稿データ
    },
    revalidate: 60, // 60秒後に再生成する
  };
};

export default function Home({ numberOfPosts }: any) {
  // console.log(allPosts);
  return (
    <>
      <Head>
        {/* ページのタイトルを設定 */}
        <title>Notion-Blog</title>
        {/* ページの説明（description）メタタグを設定 */}
        <meta name="description" content="Generated by create next app" />
        {/* ビューポートの設定を行うメタタグ。
            モバイル端末での表示を最適化するための設定 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ファビコン（ブラウザのタブに表示される小さなアイコン）の設定 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">ブログタイトル</h1>

        <div className="posts-grid">
          {numberOfPosts.map((post: any) => (
            <SinglePost
              key={post.id}
              icon={post.icon}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          ))}
        </div>
        <Link href="/posts/page/1">...もっと見る</Link>
      </main>
    </>
  );
}
