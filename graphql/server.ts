import 'reflect-metadata';

import './utils/connecition';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import CategoryResolver from './graphql/category/CategoryResolver';
import MovieResolver from './graphql/movie/MovieResolver';

async function run() {
  const schema = await buildSchema({
    resolvers: [CategoryResolver, MovieResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen(3333);
}

run();
