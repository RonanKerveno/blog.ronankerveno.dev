import { useState, useEffect } from 'react';
import { directus } from '../services/directus';

// Fonction de requête des tags
export function useFetchTags() {
  const [tags, setTags] = useState([]);

  // Requête Directus, tri par nom de tag.
  useEffect(() => {
    async function fetchTags() {
      const query = {
        fields: ['*', 'tags_id.*'],
      };
      const response = await directus.items('tags').readByQuery(query);
      const sortedTags = response.data.sort((a, b) => {
        // Comparaison insensible à la casse avec localeCompare
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      });

      setTags(sortedTags);
    }

    fetchTags();
  }, []);

  // On renvoie le tableau des tags
  return tags;
}
