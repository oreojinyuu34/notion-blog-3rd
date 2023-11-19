import Link from "next/link";
import React from "react";
import styles from "../../src/styles/Home.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <Link href="/">サイト名LOGO</Link>
        </div>
        <div className={styles.footerNav}>
          <Link href="/">(仮)作成者情報ページ</Link>
          <Link href="/">(仮)お問い合わせページ</Link>
          <Link href="/">(仮)プライバシーポリシーページ</Link>
        </div>
        <div className={styles.footerSocial}>
          <a href="/" target="_blank" rel="noopener noreferrer">
            SNSリンク予定（別サイトへ）
          </a>
        </div>
      </div>
      <div className={styles.footerCopy}>&copy;atsushi</div>
    </footer>
  );
};

export default Footer;
