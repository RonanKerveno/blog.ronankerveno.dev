// Création de l'instance Directus pour communiquer avec l'API
import config from '../config';
import { Directus } from "@directus/sdk";

export const directus = new Directus(config.API_URL);