import CategoryForm from '../../_components/category/CategoryForm';
import CategoryItem from '../../_components/category/CategoryItem';
import { CategoryWithTodos } from '@/app/board/_types';

interface Props {
  categoriesWithTodos: CategoryWithTodos[];
}

const CategoryContainer = ({ categoriesWithTodos }: Props) => {
  return (
    <ol className="flex h-full gap-x-3">
      {categoriesWithTodos.map((category: any) => {
        return <CategoryItem key={category.id} categoryWithTodos={category} />;
      })}
      <CategoryForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default CategoryContainer;
