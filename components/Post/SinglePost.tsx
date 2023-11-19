import Link from "next/link";
import React from "react";

// Propsの型定義
type Props = {
  icon?: string; // 投稿のアイコン（オプショナル）
  title: string; // 投稿のタイトル
  description: string; // 投稿の説明
  date: string; // 投稿の日付
  tags: string[]; // 投稿に関連するタグの配列
  slug: string; // 投稿へのリンクの一部となるスラッグ
};

const SinglePost = (props: Props) => {
  // プロパティの展開
  const { icon, title, description, date, tags, slug } = props;
  return (
    <section>
      <div className="post-card">
        {/* 投稿の詳細ページへのリンク */}
        <Link href={`/posts/${slug}`}>
          {/* アイコンがある場合に表示 */}
          <div className="card-content">
            {icon && (
              <div className="icon-container">
                <img src={icon} alt="Post Icon" className="post-icon" />
              </div>
            )}
            {/* 投稿のタイトル */}
            <h2 className="post-title">{title}</h2>
            {/* 日付 */}
            <div className="post-date">{date || "No Date"}</div>
            {/* 投稿に関連するタグを表示 */}
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
            {/* 投稿の説明 */}
            <p className="post-description">{description}</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SinglePost;
