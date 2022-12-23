export enum APIEndpoint {
  AUTH_LOGIN = '/auth/login',
  USER = '/user',
  USER_CREATE = '/user/create',
  RECIPE = '/recipe',
  RECIPE_CREATE = '/recipe/create',
  RECIPE_UPDATE = '/recipe/update',
  RECIPE_DELETE = '/recipe/delete',
  RECIPE_ALL = '/recipe/all',
  RECIPE_ALL_BY_USER = '/recipe/all/user',
  RECIPE_ALL_BY_TITLE = '/recipe/all/title',
  LIKE_DELETE = '/like/delete',
  LIKE_CREATE = '/like/create',
}

export enum CookiesStorage {
  ACCESS_TOKEN = 'accessToken',
}

export enum PageRoute {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  SEARCH = '/search',
  PROFILE = '/profile',
  PROFILE_RECIPE = '/profile/recipe',
  PROFILE_ADD_RECIPE = '/profile/add-recipe',
  RECIPE = '/recipe',
}
