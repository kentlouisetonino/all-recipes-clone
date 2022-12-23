import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class DeleteRecipeOutput {
  @IsNotEmpty()
  @IsNumber()
  status: number

  @IsNotEmpty()
  @IsString()
  message: string
}
