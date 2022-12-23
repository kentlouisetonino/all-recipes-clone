import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateRecipeInput {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  ingredients: string

  @IsNotEmpty()
  @IsString()
  steps: string

  @IsNotEmpty()
  @IsNumber()
  userId: number
}

export class UpdateRecipeInput {
  @IsNotEmpty()
  @IsString()
  id: number

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  author?: string

  @IsOptional()
  @IsString()
  ingredients?: string

  @IsOptional()
  @IsString()
  steps?: string

  @IsNotEmpty()
  @IsNumber()
  userId: number
}
