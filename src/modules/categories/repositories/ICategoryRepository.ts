import { User } from '../../users/infra/typeorm/entities/User';
import { Category } from '../infra/typeorm/entities/Category';

export interface ICategoryRepository {
  create(name: string, user: User): Promise<Category>;
  findAll(user_id: string, name?: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  delete(category: Category): Promise<void>;
}
