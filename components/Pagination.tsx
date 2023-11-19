import Link from "next/link";
import React from "react";

// numberOfPage: ページネーションに表示する総ページ数
interface Props {
  numberOfPage: number;
}

// Paginationコンポーネントの定義
const Pagination = (props: Props) => {
  // Propsから総ページ数を取得
  const { numberOfPage } = props;
  // 表示するページ番号の配列を生成
  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }
  // ページネーションのUIをレンダリング
  return (
    <section className="pagination-section">
      <ul className="pagination-list">
        {/* 生成したページ番号の配列をマップして、リストアイテムとしてレンダリング */}
        {pages.map((page) => (
          <li key={page} className="pagination-item">
            <Link href={`/posts/page/${page}`} className="pagination-link">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
