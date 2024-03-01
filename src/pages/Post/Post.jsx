import { useEffect } from "react";
import { useParams } from "react-router-dom";
//CSS
import styles from "./Post.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when component mounts
  }, []);

  return (
    <div className={styles.post_container}>
      {loading && <p className={styles.loading}>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Esse post trata sobre: </h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span> {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
