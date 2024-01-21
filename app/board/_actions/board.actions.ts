'use server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import createSupabaseServerClient from '@/lib/supabase/server';

export async function getCategoriesWithTodos() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.from("category").select('*, todos:todo(*)');
}

export async function addCategory(title: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("category").insert({ title }).single();
  revalidatePath("/board");
  return JSON.stringify(result);
}

export async function addTodo(todo: { title: string, description: string, expiryDate:Date, categoryId: string }) {
  const supabase = await createSupabaseServerClient();
  const payload = {
    title: todo.title,
    description: todo.description,
    expire_date: todo.expiryDate,
    category_id: todo.categoryId
  }
  const result = await supabase.from("todo").insert(payload);
  revalidatePath("/board");
  return JSON.stringify(result);
}