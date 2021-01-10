import { Document } from 'mongoose';
import { Resolver, Query, Mutation, InputType, Arg, Field } from 'type-graphql';

import CategorySchema from '../../model/CategorySchema';

import Category from './Category';

@InputType()
class CategoryInput {
  @Field()
  description: string;

  @Field()
  name: string;
}

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async getCategories(): Promise<Document[]> {
    const categories = await CategorySchema.find();
    return categories;
  }

  @Mutation(() => Category)
  async createCategorie(
    @Arg('categoryInput') categoryInput: CategoryInput,
  ): Promise<Document> {
    const category = await CategorySchema.create<CategoryInput>(categoryInput);
    return category;
  }
}
