import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}

export class UpdateCatDto {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export class DeleteCatDto {
  name: string;
  age: number;
  breed: string;
}

export class ListAllEntities {
  limit: number;
}
