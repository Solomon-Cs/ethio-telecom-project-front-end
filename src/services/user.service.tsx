import { axiosInstance } from '@/lib/axios';
import { UserFormValues } from '@/lib/validations/user';

export interface User {
    id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
}

export interface UsersResponse {
    data: User[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    message?: string;
    success?: boolean;
}

export interface UserFilters {
    page?: number;
    limit?: number;
    search?: string;
}

class UserService {
    private baseEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/users`;

    async getUsers(filters: UserFilters = {}): Promise<UsersResponse> {
        const response = await axiosInstance.get(this.baseEndpoint, {
            params: filters
        });
        console.log("response", response.data);
        return response.data;
    }

    async getUserById(id: string): Promise<User> {
        const response = await axiosInstance.get(`${this.baseEndpoint}/${id}`);
        return response.data;
    }

    async registerUser(data: UserFormValues): Promise<User> {
        const response = await axiosInstance.post(this.baseEndpoint, data);
        return response.data;
    }

    async updateUser(id: string, data: UserFormValues): Promise<User> {
        const response = await axiosInstance.put(`${this.baseEndpoint}/${id}`, data);
        return response.data;
    }

    async deleteUser(id: string): Promise<void> {
        await axiosInstance.delete(`${this.baseEndpoint}/${id}`);
    }

}

export const userService = new UserService();