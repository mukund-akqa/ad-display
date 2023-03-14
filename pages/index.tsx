import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "../styles/Home.module.css";
import Main from "../components/Main/Main";


export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}
