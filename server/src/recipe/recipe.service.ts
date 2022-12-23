import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common'

import { Recipe } from 'src/entities/Recipe'
import { CreateRecipeInput, UpdateRecipeInput } from './dto/recipe.input'
import { UserService } from 'src/user/user.service'
import { DeleteRecipeOutput } from './dto/recipe.output'

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    private userService: UserService,
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      relations: ['likes'],
    })
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const recipeDb = await this.recipeRepository.findOne(id, {
      relations: ['likes'],
    })

    if (!recipeDb) {
      throw new NotFoundException('User Id does not exist.')
    }

    return recipeDb
  }

  async getRecipesByUser(userId: number): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      userId: userId,
    })
  }

  async getRecipesByTitle(search: string): Promise<Recipe[]> {
    return await this.recipeRepository
      .createQueryBuilder()
      .select()
      .where('title Like :search', { search: `%${search}%` })
      .getMany()
  }

  async createRecipe(payload: CreateRecipeInput): Promise<Recipe> {
    const userDb = await this.userService.getUserById(payload.userId)

    const recipeInstance = this.recipeRepository.create({
      ...payload,
      author: userDb.firstName + ' ' + userDb.lastName,
    })

    return await this.recipeRepository.save(recipeInstance)
  }

  async updateRecipe(payload: UpdateRecipeInput): Promise<Recipe> {
    const recipeDb = await this.recipeRepository.findOne(payload?.id)

    if (!recipeDb) {
      throw new NotFoundException('User Id does not exist. Use a different Id.')
    }

    const recipeInstance = this.recipeRepository.create({
      ...payload,
    })

    return await this.recipeRepository.save(recipeInstance)
  }

  async deleteRecipe(id: number): Promise<DeleteRecipeOutput> {
    const deletedRecipe = await this.recipeRepository.delete(id)

    if (deletedRecipe.affected) {
      return {
        status: HttpStatus.OK,
        message: 'Recipe successfully deleted.',
      }
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Recipe already deleted.',
      }
    }
  }
}
