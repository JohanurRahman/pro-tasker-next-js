'use client';
import ExpiryDateBadge from '@/app/board/_components/ExpiryDateBadge';

const TodoItem = ({ todo, handleDragging, daysRemaining }: any) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${todo.id}`);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);
  return (
    <>
      <div
        role="button"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="flex flex-col items-start truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black">
        {todo.title}
        {daysRemaining <= 2 && <ExpiryDateBadge daysRemaining={daysRemaining} />}
      </div>
    </>
  );
};

export default TodoItem;
