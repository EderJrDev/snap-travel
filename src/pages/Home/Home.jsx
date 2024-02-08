import { useState } from "react";
//CSS
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import PostDetail from "../../components/PostDetail";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <h1>Veja os lugares mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {/* {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <h3 key={post.title}>{post.title}</h3>)} */}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados publicações</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro registro
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
