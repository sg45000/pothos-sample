import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import type PrismaTypes from '../../prisma/generated';

import { db } from '../db';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Connection: {
    totalCount: number
  }
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: db,
  },
});


builder.globalConnectionField('totalCount', (t) =>
  t.int({
    nullable: false,
    resolve: (parent) => parent.totalCount,
  })
)
