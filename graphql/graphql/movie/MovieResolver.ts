import { Document } from 'mongoose';
import { Resolver, Query, Mutation, InputType, Arg, Field } from 'type-graphql';

import MovieSchema from '../../model/MovieSchema';

import Movie from './Movie';

@InputType()
class MovieInput {
  @Field()
  description: string;

  @Field()
  name: string;

  @Field()
  category: string;
}

@Resolver(Movie)
export default class MovieResolver {
  @Query(() => [Movie])
  async getMovies(): Promise<Document[]> {
    const movies = await MovieSchema.find();
    return movies;
  }

  @Mutation(() => Movie)
  async createMovies(
    @Arg('movieInput') movieInput: MovieInput,
  ): Promise<Document> {
    const movie = await MovieSchema.create<MovieInput>(movieInput);
    return movie;
  }
}
