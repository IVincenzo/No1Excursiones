import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildConfig} from 'payload';
import {postgresAdapter} from '@payloadcms/db-postgres';
import {lexicalEditor} from '@payloadcms/richtext-lexical';
import {Users} from './collections/Users';
import {Media} from './collections/Media';
import {Activities, Categories, Destinations, Events, Guides, Providers} from './collections/editorial';
import {Bookings, Payments, ProcessedWebhookEvents} from './collections/operations';

const filename = fileURLToPath(import.meta.url); const dirname = path.dirname(filename);
const payloadSecret = process.env.PAYLOAD_SECRET ?? 'development-only-payload-secret-change-before-deploy';
if (process.env.VERCEL_ENV === 'production' && !process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is required in production');

export default buildConfig({
  secret: payloadSecret,
  admin: {user: Users.slug, importMap: {baseDir: path.resolve(dirname)}},
  editor: lexicalEditor(),
  collections: [Users, Media, Activities, Categories, Destinations, Providers, Events, Guides, Bookings, Payments, ProcessedWebhookEvents],
  localization: {locales: ['en','es','fr','de'], defaultLocale: 'en', fallback: true},
  db: postgresAdapter({pool: {connectionString: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@127.0.0.1:5432/no1_excursiones'}}),
  typescript: {outputFile: path.resolve(dirname, 'payload-types.ts')},
});

