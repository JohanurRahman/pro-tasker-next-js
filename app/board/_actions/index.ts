'use server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import createSupabaseServerClient from '@/lib/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { CategoryWithTodos, Todo } from '@/app/board/_types';

export async function getCategoriesWithTodos(): Promise<PostgrestSingleResponse<CategoryWithTodos[]>> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.from('category').select('*, todos:todo(*)');
}

export async function addCategory(title: string): Promise<PostgrestSingleResponse<void>> {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('category').insert({ title }).single();
  revalidatePath('/board');
  return result;
}

export async function addTodo(todo: {
  title: string;
  description: string;
  expiryDate: string;
  categoryId: string;
}): Promise<PostgrestSingleResponse<void>> {
  const supabase = await createSupabaseServerClient();
  const payload = {
    title: todo.title,
    description: todo.description,
    expire_date: todo.expiryDate,
    category_id: todo.categoryId,
  };
  const result = await supabase.from('todo').insert(payload).single();
  revalidatePath('/board');
  return result;
}

export async function updateTodoCategoryId(todoId: string, categoryId: string) {
  const supabase = await createSupabaseServerClient();
  return supabase.from('todo').update({ category_id: categoryId }).eq('id', todoId);
}

export async function updateTodoDetails(todo: Partial<Todo>) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('todo').update({ ...todo }).eq('id', todo.id);
  revalidatePath('/board');
  return result;
}

export async function updateTodoTitle(title: string, todoId: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('todo').update({ title }).eq('id', todoId);
  revalidatePath('/board');
  return result;
}

export async function updateTodoExpiryDate(expiryDate: string, todoId: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('todo').update({ expire_date: expiryDate }).eq('id', todoId);
  revalidatePath('/board');
  return result;
}
