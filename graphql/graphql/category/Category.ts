import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Category {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => ID)
  _id: string;
}
