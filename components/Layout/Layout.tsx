import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// LayoutProps型を定義し、childrenプロパティがReactNode型であることを指定
type LayoutProps = {
  children: ReactNode;
};

// Layoutコンポーネントを定義。このコンポーネントは子コンポーネントを受け取り、
// NavbarとFooterコンポーネントで囲むことで共通のページレイアウトを提供する
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
