import type {CollectionConfig} from 'payload';
import {authenticated} from './access';

const privateAccess = {read: authenticated, create: authenticated, update: authenticated, delete: authenticated};

export const Bookings: CollectionConfig = {slug: 'bookings', access: privateAccess, admin: {useAsTitle: 'reference'}, fields: [
  {name: 'reference', type: 'text', required: true, unique: true, index: true}, {name: 'activity', type: 'relationship', relationTo: 'activities', required: true}, {name: 'providerCode', type: 'text', required: true}, {name: 'providerReference', type: 'text'}, {name: 'slotId', type: 'text', required: true}, {name: 'participants', type: 'number', required: true, min: 1}, {name: 'status', type: 'select', required: true, options: ['pending_payment','paid_pending_confirmation','confirmed','manual_review','failed','cancelled']}, {name: 'contactEmail', type: 'email', required: true},
]};
export const Payments: CollectionConfig = {slug: 'payments', access: privateAccess, admin: {useAsTitle: 'externalPaymentId'}, fields: [
  {name: 'booking', type: 'relationship', relationTo: 'bookings', required: true}, {name: 'externalPaymentId', type: 'text', unique: true, index: true}, {name: 'amountMinor', type: 'number', required: true, min: 0}, {name: 'currency', type: 'select', options: ['EUR'], required: true}, {name: 'status', type: 'select', required: true, options: ['pending','processing','paid','failed','partially_refunded','refunded']},
]};
export const ProcessedWebhookEvents: CollectionConfig = {slug: 'processed-webhook-events', access: privateAccess, fields: [{name: 'externalEventId', type: 'text', unique: true, required: true, index: true}, {name: 'provider', type: 'select', options: ['stripe'], required: true}, {name: 'processedAt', type: 'date', required: true}]};

