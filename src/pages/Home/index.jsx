import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { SpinnerDiamond } from "spinners-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./style.module.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  function getSearch(value) {
    setErrorMessage("");
    setUser(null);
    setSearch(value);
  }

  const handleSearch = async () => {
    setLoading(true);
    if (search.length < 4) {
      setErrorMessage("Digite três ou mais caracteres.");
      setLoading(false);
      return;
    }

    if (search.length > 3) {
      const response = await fetch(`https://api.github.com/users/${search}`);
      const res = await response.json();

      if (response.status !== 200) {
        setErrorMessage(
          "Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente"
        );
        setLoading(false);
        return;
      } else {
        setTimeout(() => {
          setUser(res);
          setLoading(false);
        }, 1000);
      }
    }
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.background} />

      <img
        src="\assets\ellipse-1.png"
        alt="ellipse-1"
        className={styles.gradient1}
      />
      <img
        src="\assets\ellipse-2.png"
        alt="ellipse-2"
        className={styles.gradient2}
      />
      <img
        src="\assets\square.png"
        alt="square"
        className={styles.squareGradient}
      />

      <div className={styles.mainContent}>
        <div className={styles.titleWrapper}>
          <img
            src="\assets\github-logo.png"
            alt="github-logo"
            className={styles.gitImage}
          />
          <div className={styles.gitWrapper}>
            <p className={styles.gitTitle}>
              Perfi
              <span style={{ fontFamily: "sans-serif", fontWeight: 500 }}>
                l
              </span>
            </p>
            <img
              src="\assets\github.png"
              alt="github-text"
              className={styles.gitWriting}
            />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="search"
            placeholder="Digite um usuário do Github"
            className={styles.searchInput}
            onChange={(e) => getSearch(e.target.value)}
          />
          <button
            type="button"
            className={styles.searchButton}
            onClick={() => !loading && handleSearch()}
            disabled={loading}
          >
            {!loading ? (
              <IoSearchOutline />
            ) : (
              <SpinnerDiamond
                size={36}
                thickness={100}
                speed={150}
                color="rgba(0, 92, 255, 1)"
                secondaryColor="rgba(255, 255, 255, 1)"
              />
            )}
          </button>
        </div>
        <div className={styles.searchContainer}>
          <>
            {!loading && errorMessage.length === 0 && user && (
              <div className={styles.userCardWrapper}>
                <img
                  src={user?.avatar_url}
                  alt="user-image"
                  className={styles.userImage}
                />
                <div className={styles.cardUserText}>
                  <p className={styles.userName}>
                    {" "}
                    {user?.name ?? "Nome não informado"}{" "}
                  </p>
                  <p className={styles.userBio}>
                    {" "}
                    {user?.bio ?? "Bio não informada"}
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className={styles.userCardWrapper}>
                <Skeleton
                  circle
                  height="200px"
                  width="200px"
                  containerClassName="avatar-skeleton"
                />
                <div className={styles.cardUserText}>
                  <Skeleton height="36px" />
                  <Skeleton height="88px" />
                </div>
              </div>
            )}

            {!loading && errorMessage && (
              <div className={styles.errorMessage}>
                <p>{errorMessage}</p>
              </div>
            )}
          </>
        </div>
      </div>
    </main>
  );
}
