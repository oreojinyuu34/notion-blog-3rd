import React, { useState } from "react";
import Link from "next/link";
import styles from "../../src/styles/Home.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">LOGO</Link>
        </div>
        {/* ハンバーガーメニューアイコン */}
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* ナビゲーションリンク */}
        <ul className={isOpen ? styles.navListOpen : styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">リンクページ1</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/">リンクページ2</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/">リンクページ3</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
