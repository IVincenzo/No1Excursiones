import type {CollectionConfig} from 'payload';
import {authenticated} from './access';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {mimeTypes: ['image/*'], imageSizes: [{name: 'card', width: 800, height: 530, position: 'centre'}, {name: 'hero', width: 1800, height: 1000, position: 'centre'}]},
  access: {read: () => true, create: authenticated, update: authenticated, delete: authenticated},
  fields: [{name: 'alt', type: 'text', localized: true, required: true}],
};

