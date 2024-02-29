import { Link } from "react-router-dom";
import styles from "./Search.module.css";

import { useQuery } from "../../hooks/useQuery";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import PostDetail from "../../components/PostDetail";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  console.log(search)

  const { documents: posts } = useFetchDocuments("posts", search);

  console.log("posts: ", posts);
  return (
    <div className={styles.search_container}>
      <h2>pesquisa: {search}</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
