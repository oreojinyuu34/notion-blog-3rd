// Notion APIとnotion-to-md（NotionのデータをMarkdownに変換するライブラリ）をインポート
import { Client } from "@notionhq/client";
import { NUMBER_OF_POSTS_PER_PAGE } from "constants/constants";
import { NotionToMarkdown } from "notion-to-md";

// Notion APIクライアントの初期化
const notion =new Client ({
  auth: process.env.NOTION_TOKEN,
})
const n2m = new NotionToMarkdown({ notionClient:notion})

// Notionデータベースからすべての投稿を取得する関数
export const getAllPosts =async () => {
  const databaseId: string = process.env.NOTION_DATABASE_ID as string;
  // Notionデータベースをクエリして投稿を取得
  const posts = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    // Publishedのチェックマークが入ってるもののみデータを取得する
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    // 日付の項目の新しい順に表示する
    sorts: [
      {
      property: "日付",
      direction: "descending",
      },
    ],
  })

  const allPosts = posts.results;

  // 各投稿から必要なメタデータを取得
  return allPosts.map((post) => {
    return getPageMetaData(post);
  })
}

type Tag = {
  name: string;
}

// 投稿のメタデータを取得する関数
const getPageMetaData = (post: any) => {
  // 投稿のタグ情報を個別に取得する
  const getTags = (tags: Tag[]) => {
    const allTags = tags.map((tag: Tag) => {
      return tag.name;
    });
    return allTags;
  }
  // 投稿から必要な情報を抽出して返す
  return {
    id: post.id,
    icon: post.icon?.external?.url ?? '',
    title: post.properties.名前.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.日付.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    //tags: post.properties.タグ.multi_select,下のコードに変更してmap関数で複数データ取得
    tags: getTags(post.properties.タグ.multi_select),
  };

}

// URLでページ変更時のSlug（スラッグ）をNotionデータベースから取得
export const getSinglePost = async (slug: string) => {
  // NotionデータベースIDを取得
  const databaseId: string = process.env.NOTION_DATABASE_ID as string;
  const response = await notion.databases.query({
    database_id:databaseId,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        }
      }
    }
  })

  const page = response.results[0]
  const metadata = getPageMetaData(page);
  // console.log(metadata)

   // 投稿のコンテンツをMarkdown形式に変換
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  // console.log(mdString)

  return {
    metadata,
    markdown: mdString,
  }
}


// // Topページ記事に取得
// export const getPostsForTopPage = async (pageSize = 6) => {
//   const allPosts = await getAllPosts();
//   // 指定された数の投稿を取得（pageSize = 6）
//   const numberOfPosts = allPosts.slice(0, pageSize)
//   return numberOfPosts;
// }

// Topページ記事に取得
//constantsフォルダ→constants.tsファイル作成先のNUMBER_OF_POSTS_PER_PAGEの数だけ取得
export const getPostsForTopPage = async () => {
  const allPosts = await getAllPosts();
  const numberOfPosts = allPosts.slice(0, NUMBER_OF_POSTS_PER_PAGE)
  return numberOfPosts;
}

// ページ番号に応じた記事取得
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex)
}

// 投稿の総ページ数を取得する関数
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();

  return Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) + (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0
  )
}
