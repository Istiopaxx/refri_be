import { Recipe as PrismaRecipe } from '@app/recipe/domain/recipe.entity';
import { Recipe as MongoRecipe } from '@app/recipe/domain/mongo/mongo.recipe.entity';
import { ICrudRepository } from '@app/common/repository/crud.repository';
import { FilterRecipeDto } from '../../dto/recipe/filter-recipe.dto';
import { CreateRecipeDto } from '@app/recipe/dto/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '@app/recipe/dto/recipe/update-recipe.dto';
import { TextSearchRecipeDto } from '@app/recipe/dto/recipe/text-search.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesAndCountDto } from '@app/recipe/dto/recipe/recipes-count.dto';

type Recipe = PrismaRecipe | MongoRecipe;

export interface IRecipeRepository
  extends ICrudRepository<
    Recipe,
    CreateRecipeDto,
    UpdateRecipeDto,
    FilterRecipeDto
  > {
  findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto>;

  findTopViewed(): Promise<RecipesItemDto[]>;

  findAllByIds(ids: number[]): Promise<RecipesItemDto[]>;

  increaseViewCount(id: number): Promise<Recipe>;
}
