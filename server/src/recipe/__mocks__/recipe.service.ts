import { recipeStub, deleteRecipeStub } from '../test/stubs/recipe.stub'

export const RecipeService = jest.fn().mockReturnValue({
  getRecipes: jest.fn().mockReturnValue([recipeStub()]),
  getRecipeById: jest.fn().mockReturnValue(recipeStub()),
  getRecipesByUser: jest.fn().mockReturnValue([recipeStub()]),
  getRecipesByTitle: jest.fn().mockReturnValue([recipeStub()]),
  createRecipe: jest.fn().mockResolvedValue(recipeStub()),
  updateRecipe: jest.fn().mockResolvedValue(recipeStub()),
  deleteRecipe: jest.fn().mockResolvedValue(deleteRecipeStub()),
})
