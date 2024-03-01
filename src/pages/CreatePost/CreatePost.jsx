import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
//CSS
import styles from "./CreatePost.module.css";

import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");

    // validade image URL

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    //criar o array de tags

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // chegar todos os valores
    if (!title || !body || !image || !tags) {
      setFormError("Por favor, preencha todos os campos");
    }
    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    toast.success("Post criado com sucesso!");

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Registro</h2>
      <p>Escreva sobre a sua experiência em sua viagem</p>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          <span>Local</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Lugar que você viajou"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          {" "}
          <span>URL da imagem</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem do lugar que você visitou"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          {" "}
          <span>Conteúdo</span>
          <textarea
            name="body"
            required
            placeholder="Insira a sua experiência na viagem"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          {" "}
          <span>Tags:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && <button className="btn">Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
