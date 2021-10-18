import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetAuthorArgs {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  firstName?: string;
}
