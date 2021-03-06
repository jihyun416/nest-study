import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  authorId: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field((type) => Int, { nullable: true })
  votes?: number;
}
