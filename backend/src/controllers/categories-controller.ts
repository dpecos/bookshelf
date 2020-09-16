import { Category } from '@repository/entities/category';
import { CategoriesService } from '@services/categories-service';
import { getLogger } from '@utils/logger';
import express from 'express';
import asyncHandler from 'express-async-handler';

export function setupCategoriesAPI(
  categoriesService: CategoriesService
): express.Router {
  const logger = getLogger('controller:categories');

  const router = new express.Router();

  router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await categoriesService.getCategories());
    })
  );

  router.get(
    '/:categoryId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await categoriesService.getCategory(req.params.categoryId));
    })
  );

  router.post(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const category = req.body as Category;

      const newCategory = await categoriesService.createCategory(category);

      res.send(newCategory);
    })
  );

  router.put(
    '/:categoryId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const category = req.body as Category;

      await categoriesService.updateCategory(category);

      res.send(await categoriesService.getCategory(category.id));
    })
  );

  router.delete(
    '/:categoryId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const category = req.body as Category;

      await categoriesService.deleteCategory(req.params.categoryId);

      res.send({});
    })
  );

  logger.info('API: Endpoints for categories activated');

  return router;
}
