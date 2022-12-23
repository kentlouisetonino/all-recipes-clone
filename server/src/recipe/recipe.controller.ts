import { Controller, Get, Post, Req, Delete, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { AuthGuard } from '../auth/guards/auth.guard'
import { Public } from '../auth/decorators/public.decorator'
import { RecipeService } from './recipe.service'
import { Recipe } from 'src/entities/Recipe'
import { DeleteRecipeOutput } from './dto/recipe.output'

@Controller('recipe')
@UseGuards(AuthGuard)
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('all')
  @Public()
  getRecipes(): Promise<Recipe[]> {
    return this.recipeService.getRecipes()
  }

  @Get()
  @Public()
  getRecipeById(@Req() req: Request): Promise<Recipe> {
    return this.recipeService.getRecipeById(Number(req.query?.id))
  }

  @Get('all/user')
  getRecipesByUser(@Req() req: Request): Promise<Recipe[]> {
    return this.recipeService.getRecipesByUser(Number(req.query?.id))
  }

  @Get('all/title')
  @Public()
  getRecipesByTitle(@Req() req: Request): Promise<Recipe[]> {
    return this.recipeService.getRecipesByTitle(String(req.query?.search))
  }

  @Post('create')
  @Public()
  createRecipe(@Req() req: Request): Promise<Recipe> {
    return this.recipeService.createRecipe(req.body)
  }

  @Post('update')
  updateRecipe(@Req() req: Request): Promise<Recipe> {
    return this.recipeService.updateRecipe(req.body)
  }

  @Delete('delete')
  deleteRecipe(@Req() req: Request): Promise<DeleteRecipeOutput> {
    return this.recipeService.deleteRecipe(Number(req.query.id))
  }
}
