// Next.jsの特別なコンポーネントをインポートします
import { Html, Head, Main, NextScript } from "next/document";

// Documentコンポーネントをエクスポートします
export default function Document() {
  return (
    // HTMLドキュメント全体を定義
    <Html lang="ja">
      {/* 言語を日本語に設定 */}
      <Head>
        {/* ドキュメントの<head>部分。
            ここにメタデータやスタイルシートのリンクを追加できます */}
      </Head>
      <body>
        {/* <Main />はアプリケーションのメインコンテンツがレンダリングされる場所 */}
        <Main />

        {/* <NextScript />はNext.jsが動作するために必要なスクリプトを含みます */}
        <NextScript />
      </body>
    </Html>
  );
}
