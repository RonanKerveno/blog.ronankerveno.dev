// Hook personnalisé pour la recherche des tags.

import { useState, useEffect } from 'react';
import { directus } from '../services/directus';

export function useFetchTags() {
  const [tags, setTags] = useState([]);

  // Requête Directus, tri par nom de tag.
  useEffect(() => {
    async function fetchTags() {
      const query = {
        fields: ['*', 'tags_id.*'],
        sort: 'name',
      };
      const response = await directus.items('tags').readByQuery(query);
      setTags(response.data);
    }

    fetchTags();
  }, []);

  // On renvoie le tableau des tags
  return tags;
}
