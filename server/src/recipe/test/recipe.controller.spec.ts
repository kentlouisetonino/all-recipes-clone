import { Test } from '@nestjs/testing'
import { Request } from 'express'

import { RecipeController } from '../recipe.controller'
import { RecipeService } from '../recipe.service'
import { deleteRecipeStub, recipeStub } from './stubs/recipe.stub'
import { AuthGuard } from '../../auth/guards/auth.guard'
import { Recipe } from 'src/entities/Recipe'
import { CreateRecipeInput, UpdateRecipeInput } from '../dto/recipe.input'
import { DeleteRecipeOutput } from '../dto/recipe.output'

jest.mock('../recipe.service')

describe('RecipeController', () => {
  let recipeController: RecipeController
  let recipeService: RecipeService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [RecipeController],
      providers: [
        RecipeService,
        {
          provide: AuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    }).compile()

    recipeController = moduleRef.get<RecipeController>(RecipeController)
    recipeService = moduleRef.get<RecipeService>(RecipeService)
    jest.clearAllMocks()
  })

  describe('A. getRecipes', () => {
    let recipes: Recipe[]

    beforeEach(async () => {
      recipes = await recipeController.getRecipes()
    })

    test('#1: If getRecipes is called.', () => {
      expect(recipeService.getRecipes).toHaveBeenCalled()
    })

    test('#2: If getRecipes returns an array.', () => {
      expect(recipeService.getRecipes()).toBe(recipes)
    })
  })

  describe('B. getRecipeById', () => {
    let recipe: Recipe

    const request: Request | any = {
      query: {
        id: recipeStub().id,
      },
    }

    beforeEach(async () => {
      recipe = await recipeController.getRecipeById(request)
    })

    test('#1: If getRecipeById is called.', () => {
      expect(recipeService.getRecipeById).toBeCalledWith(request.query.id)
    })

    test('#2: If getRecipeById returns a recipe object.', () => {
      expect(recipeService.getRecipeById(recipeStub().id)).toBe(recipe)
    })
  })

  describe('C. getRecipesByUser', () => {
    let recipes: Recipe[]

    const request: Request | any = {
      query: {
        id: recipeStub().userId,
      },
    }

    beforeEach(async () => {
      recipes = await recipeController.getRecipesByUser(request)
    })

    test('#1: If getRecipeByUser is called.', () => {
      expect(recipeService.getRecipesByUser).toBeCalledWith(request.query.id)
    })

    test('#2: If getRecipeByUser returns an array of recipes.', () => {
      expect(recipeService.getRecipesByUser(recipeStub().userId)).toBe(recipes)
    })
  })

  describe('C. getRecipesByTitle', () => {
    let recipes: Recipe[]

    const request: Request | any = {
      query: {
        search: recipeStub().title,
      },
    }

    beforeEach(async () => {
      recipes = await recipeController.getRecipesByTitle(request)
    })

    test('#1: If getRecipesByTitle is called.', () => {
      expect(recipeService.getRecipesByTitle).toBeCalledWith(
        request.query.search,
      )
    })

    test('#2: If getRecipesByTitle returns an array of recipes.', () => {
      expect(recipeService.getRecipesByTitle(recipeStub().title)).toBe(recipes)
    })
  })

  describe('D. createRecipe', () => {
    let recipe: Recipe
    let createRecipeInput: CreateRecipeInput

    beforeEach(async () => {
      createRecipeInput = {
        title: recipeStub().title,
        description: recipeStub().description,
        ingredients: recipeStub().ingredients,
        steps: recipeStub().steps,
        userId: recipeStub().userId,
      }

      const request: Request | any = {
        body: createRecipeInput,
      }

      recipe = await recipeController.createRecipe(request)
    })

    test('#1: If createRecipe is called.', () => {
      expect(recipeService.createRecipe).toHaveBeenCalledWith(createRecipeInput)
    })

    test('#2: If createRecipe return a recipe object.', () => {
      expect(recipe).toEqual(recipeStub())
    })
  })

  describe('E. updateRecipe', () => {
    let recipe: Recipe
    let updateRecipeInput: UpdateRecipeInput

    beforeEach(async () => {
      updateRecipeInput = {
        id: recipeStub().id,
        title: recipeStub().title,
        description: recipeStub().description,
        userId: recipeStub().userId,
      }

      const request: Request | any = {
        body: updateRecipeInput,
      }

      recipe = await recipeController.updateRecipe(request)
    })

    test('#1: If updateRecipe is called.', () => {
      expect(recipeService.updateRecipe).toHaveBeenCalledWith(updateRecipeInput)
    })

    test('#2: If updateRecipe returns a recipe object.', () => {
      expect(recipe).toStrictEqual(recipeStub())
    })
  })

  describe('F. deleteRecipe', () => {
    let deleteRecipeOutput: DeleteRecipeOutput

    const request: Request | any = {
      query: {
        id: recipeStub().id,
      },
    }

    beforeEach(async () => {
      deleteRecipeOutput = await recipeController.deleteRecipe(request)
    })

    test('#1: If deleteRecipe is called', () => {
      expect(recipeService.deleteRecipe).toHaveBeenCalledWith(recipeStub().id)
    })

    test('#2: If deleteRecipe returns an output.', () => {
      expect(deleteRecipeOutput).toStrictEqual(deleteRecipeStub())
    })
  })
})
