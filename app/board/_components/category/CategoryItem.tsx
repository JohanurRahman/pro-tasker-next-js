'use client';

import React, { useState } from 'react';

import TodoItem from '@/app/board/_components/todos/TodoItem';
import TodoCreate from '@/app/board/_components/todos/TodoCreate';
import TodoDetails from '@/app/board/_components/todos/details-dialog';

import { getDaysRemaining } from '@/app/board/_utils';
import { CategoryItemProps, Todo } from '@/app/board/_types';

const CategoryItem = ({ categoryWithTodos, handleUpdateList }: CategoryItemProps) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const { title, id: categoryId } = categoryWithTodos;

  const todos = categoryWithTodos.todos.map((todo) => {
    return { ...todo, daysRemaining: getDaysRemaining(todo.expire_date) };
  });

  const [isTodoCreateDialogOpen, setTodoCreateDialogOpen] = useState(false);
  const [isTodoEditDialogOpen, setTodoEditDialogOpen] = useState(false);

  const handleTodoCreateDialogToggle = (isOpen: boolean) => {
    setTodoCreateDialogOpen(isOpen);
  };

  const handleTodoEditDialogToggle = (isOpen: boolean, todo: Todo) => {
    setSelectedTodo(todo);
    setTodoEditDialogOpen(isOpen);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('text');
    handleUpdateList(todoId, categoryId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <>
      <TodoCreate />

      <li className="h-full w-[272px] shrink-0 select-none">
        <div className="w-full rounded-xl bg-[#f1f2f4] pb-2 shadow-md">

          <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
            <div className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium">
              {title}
            </div>
          </div>

          <div onDrop={handleDrop} onDragOver={handleDragOver}>
            <ol className="mx-1 mt-2 flex flex-col gap-y-2 px-1 py-0.5">
              {todos.map((todo: any) => (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  daysRemaining={todo.daysRemaining}
                  handleTodoEditDialogToggle={handleTodoEditDialogToggle}
                />
              ))}
            </ol>

            <div className="px-2 pt-2">
              <button
                className="flex h-auto w-full justify-start px-2 py-1.5 text-sm text-slate-500"
                onClick={() => handleTodoCreateDialogToggle(true)}>
                + Add a todo
              </button>
            </div>
          </div>
        </div>
      </li>

      {/* Todo Create Dialog */}
      <TodoCreate isOpen={isTodoCreateDialogOpen} onToggle={handleTodoCreateDialogToggle} categoryId={categoryId} />

      {/* Todo Edit Dialog */}
      {selectedTodo && (
        <TodoDetails
          isOpen={isTodoEditDialogOpen}
          onToggle={handleTodoEditDialogToggle}
          todo={selectedTodo}
          categoryTitle={title}
        />
      )}
    </>
  );
};

export default CategoryItem;
