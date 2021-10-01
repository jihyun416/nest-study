export class CreateCatDto {
  name: string;
  age: number;
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
