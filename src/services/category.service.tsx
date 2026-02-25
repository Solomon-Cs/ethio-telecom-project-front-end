import { axiosInstance } from '@/lib/axios';
import { CategoryFormValues } from '@/lib/validations/category';

export interface Category {
    id: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    description?: string | null;
    userId?: string;
}

export interface CategoriesResponse {
    data: Category[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    message?: string;
    success?: boolean;
}

export interface CategoryFilters {
    page?: number;
    limit?: number;
    type?: string;
    name?: string;
    userId?: string;
}

class CategoryService {
    private baseEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

    async getCategories(filters: CategoryFilters = {}): Promise<CategoriesResponse> {
        const response = await axiosInstance.get(this.baseEndpoint, {
            params: filters
        });
        return response.data;
    }

    async getCategoryById(id: string): Promise<Category> {
        const response = await axiosInstance.get(`${this.baseEndpoint}/${id}`);
        return response.data;
    }
    async getCategoryByUserId(userId: string, filters: CategoryFilters = {}): Promise<CategoriesResponse> {
        const response = await axiosInstance.get(`${this.baseEndpoint}/user/${userId}`, {
            params: filters
        });
        return response.data;
    }

    async createCategory(data: CategoryFormValues): Promise<Category> {
        const response = await axiosInstance.post(this.baseEndpoint, data);
        return response.data;
    }

    async updateCategory(id: string, data: CategoryFormValues): Promise<Category> {
        const response = await axiosInstance.put(`${this.baseEndpoint}/${id}`, data);
        return response.data;
    }

    async deleteCategory(id: string): Promise<void> {
        await axiosInstance.delete(`${this.baseEndpoint}/${id}`);
    }
}

export const categoryService = new CategoryService();