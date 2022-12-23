import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateLikeInput {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsNotEmpty()
  @IsNumber()
  recipeId: number
}
