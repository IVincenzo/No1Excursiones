import type {CollectionConfig, Field} from 'payload';
import {authenticated, publishedOrAuthenticated} from './access';
import {revalidateAfterChange, revalidateAfterDelete} from '@/lib/content/revalidation';

const commonAccess = {read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated};
const contentHooks = {afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete]};
const versions = {drafts: {autosave: true}} as const;
const slugFields: Field[] = [{name: 'slug', type: 'text', localized: true, required: true, index: true}, {name: 'title', type: 'text', localized: true, required: true}];
const seoFields: Field = {name: 'seo', type: 'group', fields: [{name: 'title', type: 'text', localized: true}, {name: 'description', type: 'textarea', localized: true, maxLength: 170}, {name: 'canonical', type: 'text', localized: true}, {name: 'index', type: 'checkbox', defaultValue: true}]};

function directoryCollection(slug: 'categories' | 'destinations' | 'providers'): CollectionConfig {
  return {slug, admin: {useAsTitle: 'name'}, access: commonAccess, versions, hooks: contentHooks, fields: [
    {name: 'code', type: 'text', unique: true, required: true, index: true},
    {name: 'name', type: 'text', localized: true, required: true},
    {name: 'slug', type: 'text', localized: true, required: true, index: true},
    {name: 'description', type: 'textarea', localized: true}, seoFields,
  ]};
}

export const Categories = directoryCollection('categories');
export const Destinations = directoryCollection('destinations');
export const Providers = directoryCollection('providers');

export const Activities: CollectionConfig = {
  slug: 'activities', admin: {useAsTitle: 'code'}, access: commonAccess, versions,
  hooks: contentHooks,
  fields: [
    {name: 'code', type: 'text', unique: true, required: true, index: true}, ...slugFields,
    {name: 'shortDescription', type: 'textarea', localized: true, required: true},
    {name: 'badge', type: 'text', localized: true},
    {name: 'description', type: 'textarea', localized: true, required: true},
    {name: 'category', type: 'relationship', relationTo: 'categories'},
    {name: 'destination', type: 'relationship', relationTo: 'destinations'},
    {name: 'provider', type: 'relationship', relationTo: 'providers'},
    {name: 'images', type: 'upload', relationTo: 'media', hasMany: true},
    {name: 'legacyImageUrl', type: 'text', admin: {description: 'Temporary source URL; replace with an owned Media asset before production.'}},
    {name: 'videos', type: 'array', fields: [{name: 'url', type: 'text', required: true}, {name: 'title', type: 'text', localized: true}]},
    {type: 'row', fields: [{name: 'duration', type: 'text', localized: true}, {name: 'difficulty', type: 'select', options: ['easy','moderate','difficult']}, {name: 'minimumAge', type: 'number', min: 0}]},
    {name: 'meetingPoint', type: 'textarea', localized: true}, {name: 'pickupAvailable', type: 'checkbox'},
    {name: 'included', type: 'array', localized: true, fields: [{name: 'item', type: 'text', required: true}]},
    {name: 'notIncluded', type: 'array', localized: true, fields: [{name: 'item', type: 'text', required: true}]},
    {name: 'highlights', type: 'array', localized: true, fields: [{name: 'item', type: 'text', required: true}]},
    {type: 'row', fields: [{name: 'priceFromMinor', type: 'number', min: 0}, {name: 'currency', type: 'select', options: ['EUR'], defaultValue: 'EUR'}]},
    {name: 'bookingProvider', type: 'select', required: true, defaultValue: 'mock', options: ['mock','manual','bokun','fareharbor','rezdy']},
    {name: 'bookingProductId', type: 'text'}, seoFields,
  ],
};

export const Events: CollectionConfig = {slug: 'events', admin: {useAsTitle: 'title'}, access: commonAccess, versions, hooks: contentHooks, fields: [...slugFields, {name: 'description', type: 'textarea', localized: true, required: true}, {name: 'startsAt', type: 'date', required: true}, {name: 'endsAt', type: 'date'}, {name: 'location', type: 'text'}, {name: 'isVerified', type: 'checkbox', defaultValue: false}, seoFields]};
export const Guides: CollectionConfig = {slug: 'guides', admin: {useAsTitle: 'title'}, access: commonAccess, versions, hooks: contentHooks, fields: [...slugFields, {name: 'excerpt', type: 'textarea', localized: true}, {name: 'body', type: 'richText', localized: true, required: true}, {name: 'heroImage', type: 'upload', relationTo: 'media'}, seoFields]};
