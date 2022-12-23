import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class DeleteLikeOutput {
  @IsNotEmpty()
  @IsNumber()
  status: number

  @IsNotEmpty()
  @IsString()
  message: string
}
