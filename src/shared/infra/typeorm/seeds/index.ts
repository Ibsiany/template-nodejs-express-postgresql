import { dataSource } from '..';
import { Category } from '../../../../modules/categories/infra/typeorm/entities/Category';
import { categories } from './categories';

export const seed = async (): Promise<void> => {
  const ormRepository = dataSource.getRepository(Category);

  for (const { name, color, id } of categories) {
    const invoiceCategory = await ormRepository.findOne({ where: { id } });

    console.log(invoiceCategory);

    if (!invoiceCategory) {
      await ormRepository.query(
        `INSERT INTO Category (id, color, name) VALUES ('${id}','${color}', '${name}')`,
      );
    }
  }

  console.log('>>>>>>>>>> Categories inserts! <<<<<<<<<<');
  process.exit();
};

seed();
