import Fuse from 'fuse.js';
import { useState } from 'react';
import styles from './Search.module.css';

const options = {
  keys: ['data.title', 'data.description'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.3,
};

export default function Search({ searchList }) {
  const [query, setQuery] = useState('');

  const fuse = new Fuse(searchList, options);
  
  const posts = query.length > 1 
    ? fuse.search(query).map(result => result.item)
    : [];

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  function handleClearSearch() {
    setQuery('');
    // Opcional: focar no input após limpar
    document.getElementById('search')?.focus();
  }

  return (
    <div className={styles.container}>
      <label htmlFor="search" className={styles.srOnly}>Search</label>
      
      <div className={styles.inputWrapper}>
        <input
          id="search"
          type="text"
          value={query}
          onChange={handleOnSearch}
          placeholder="Buscar artigos..."
          className={styles.input}
        />
        
        {/* Botão de limpar - só aparece se tiver texto */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClearSearch}
            className={styles.clearButton}
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>

      {query.length > 1 && posts.length > 0 && (
        <ul className={styles.list}>
          {posts.map(post => (
            <li key={post.id} className={styles.item}>
              <a href={`/${post.collection}/contents/${post.id}`} className={styles.link}>
                {post.data.title}
              </a>
              <p className={styles.description}>
                {post.data.description}
              </p>
            </li>
          ))}
        </ul>
      )}

      {query.length > 1 && posts.length === 0 && (
        <p className={styles.noResults}>
          Nenhum resultado para '{query}'
        </p>
      )}
    </div>
  );
}