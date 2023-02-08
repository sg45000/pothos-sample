import { writeFileSync } from 'fs';
import { join } from 'path'
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import { lexicographicSortSchema, printSchema } from 'graphql/utilities';
import type PrismaTypes from '../prisma/generated';
import { db } from './db';

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: db,
  },
});

const schemaAsString = printSchema(lexicographicSortSchema(builder.toSchema()));

writeFileSync(join(__dirname, '..', 'schema.graphql'), schemaAsString);
