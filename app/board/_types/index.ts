export interface CategoryFormData {
  title: string;
}

export interface TodoFormData {
  title: string;
  description: string;
  expiryDate: Date;
}


export interface ExpiryDateBadgeProps {
  daysRemaining: number;
}

export interface BadgeInfo {
  colorClass: string;
  expireStatus: string;
}


export interface Category {
  id: string;
  title: string;
  created_at: string;
  update_at?: string;
  user_id: string;
}

export interface Todo {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  description: string;
  expire_date: string;
}

export type CategoryWithTodos = Category & { todos: Todo[] };
