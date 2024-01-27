import { Repository } from 'typeorm';
import { dataSource } from '../../../../../shared/infra/typeorm';
import { User } from '../../../../users/infra/typeorm/entities/User';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { Category } from '../entities/Category';

export class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Category);
  }

  async create(name: string, user: User): Promise<Category> {
    const category = this.ormRepository.create({ name, user });

    return this.ormRepository.save(category);
  }

  async findAll(user_id: string, name?: string): Promise<Category[]> {
    const query = this.ormRepository
      .createQueryBuilder('category')
      .innerJoin('category.user', 'user', 'user.id = category.user_id')
      .where(`user.id = '${user_id}'`);

    if (name) {
      query.andWhere(`lower(category.name) ilike '%${name}%'`);
    }

    return query.getMany();
  }

  async findById(id: string): Promise<Category | null> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  async delete(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }
}
