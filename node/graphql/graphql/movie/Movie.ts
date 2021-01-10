import { Field, ID, ObjectType } from 'type-graphql';

import Category from '../category/Category';

@ObjectType()
export default class Movie {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  category: Category;

  @Field(() => ID)
  _id: string;
}
