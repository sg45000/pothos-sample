import { db } from "../db";
import { builder } from "./builder";

builder.queryField('user', (t) =>
  t.field({
    type: User,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (_, args) =>
      db.user.findUniqueOrThrow({
        where: { id: Number.parseInt(String(args.id), 10) },
      }),
  }),
);

const User = builder.prismaNode('User', {
    id: { field: 'id' },
    fields: (t) => ({
      firstName: t.exposeString('firstName'),
      lastName: t.exposeString('lastName'),
      fullName: t.string({
        resolve: (user) => `${user.firstName} ${user.lastName}`,
      }),
      posts: t.prismaConnection({
        type: Post,
        cursor: 'id',
        totalCount: () => 1,
        resolve: (query) =>
          db.post.findMany({
            ...query,
          }),
      },
        PostConnection
      ),
    }),
});

const Post = builder.prismaNode('Post', {
    id: { field: 'id' },
    fields: (t) => ({
      title: t.exposeString('title'),
      content: t.exposeString('content'),
      author: t.relation('author'),
    }),
  });
  
const PostConnection = builder.connectionObject(
  {
    type: Post,
    name: 'PostConnection',
  },
  {
    name: 'PostEdge',
  }
)

builder.queryType()

export const schema = builder.toSchema();
