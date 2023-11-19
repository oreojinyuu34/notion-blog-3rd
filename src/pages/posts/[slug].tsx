import { getAllPosts, getSinglePost } from "lib/notionAPI";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

// すべての投稿の静的パス(urlのsulg)を生成するための関数
export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths: paths,
    fallback: "blocking", // パスが見つからない場合はブロッキング
  };
};

// 静的生成のための個々の投稿データを取得する関数
export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

// copyボタンの実装
type CopyButtonProps = {
  copyText: string; // コピーするテキスト
};

const CopyButton = ({ copyText }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false); // コピー状態の管理

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyText); // テキストをクリップボードにコピー
    setIsCopied(true); // 状態をコピー済みに設定
    setTimeout(() => setIsCopied(false), 2000); // 2秒後に状態をリセット
  };

  return (
    <button onClick={handleCopy} className="copy-button">
      {/* コピー状態に応じてボタンのラベルを変更 */}
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
// コードブロックとコピーボタンを含むコンポーネント
type CodeBlockProps = {
  language: string;
  value: string;
};
const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <div className="code-block-container">
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {/* コードをシンタックスハイライトで表示 */}
        {value}
      </SyntaxHighlighter>
      {/* コピーボタンを表示 */}
      <CopyButton copyText={value} />
    </div>
  );
};
// 投稿ページのメインコンポーネント
const Post = ({ post }: any) => {
  const { icon } = post.metadata;
  return (
    <section className="post-section">
      {/* アイコン、タイトル、説明、日付、タグの表示 */}
      <div className="post-header">
        <span>
          {icon && <img src={icon} alt="Post Icon" className="post-icon" />}{" "}
        </span>
        <h2 className="post-title-text">{post.metadata.title}</h2>
        <div className="post-description">{post.metadata.description}</div>
        <span className="post-date">投稿日:{post.metadata.date}</span>
        <br />
        {post.metadata.tags.map((tag: string, index: number) => (
          <p key={index} className="tag">
            {tag}
          </p>
        ))}
      </div>
      <div className="post-content">
        {/* Markdown形式のコンテンツをレンダリング
        コードの意味はReactMarkdownのgithub内容をコピペしたもの、
        詳細は理解できてません */}
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                // 言語情報がある場合は、カスタムのCodeBlockコンポーネントを使用
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, "")}
                />
              ) : (
                // 言語情報がない場合は、通常の`code`タグでレンダリング
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {/* Markdown形式のテキストデータ */}
          {post.markdown.parent}
        </ReactMarkdown>
        {/* ホームへのリンク */}
        <Link href="/">
          <span className="back-to-home">ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
