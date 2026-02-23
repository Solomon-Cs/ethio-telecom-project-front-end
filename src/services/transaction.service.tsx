import { axiosInstance } from '@/lib/axios';
import { TransactionFormValues } from '@/lib/validations/transaction';

export interface Transaction {
    id: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    category: string;
    description?: string | null;
    date: string;
    userId: string;
}

export interface TransactionsResponse {
    data: Transaction[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    message?: string;
    success?: boolean;
}

export interface TransactionFilters {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
}

class TransactionService {
    private baseEndpoint = 'http://localhost:7001/api/transactions';

    async getTransactions(filters: TransactionFilters = {}): Promise<TransactionsResponse> {
        const response = await axiosInstance.get(this.baseEndpoint, {
            params: filters
        });
        console.log("🚀 ~ TransactionService ~ getTransactions ~ response:", response)
        return response.data;
    }

    async getTransactionById(id: string): Promise<Transaction> {
        const response = await axiosInstance.get(`${this.baseEndpoint}/${id}`);
        return response.data;
    }

    async createTransaction(data: TransactionFormValues): Promise<Transaction> {
        const response = await axiosInstance.post(this.baseEndpoint, data);
        return response.data;
    }

    async updateTransaction(id: string, data: TransactionFormValues): Promise<Transaction> {
        const response = await axiosInstance.put(`${this.baseEndpoint}/${id}`, data);
        return response.data;
    }

    async deleteTransaction(id: string): Promise<void> {
        await axiosInstance.delete(`${this.baseEndpoint}/${id}`);
    }

    async getCategories(): Promise<string[]> {
        const response = await axiosInstance.get(`${this.baseEndpoint}/categories`);
        return response.data;
    }

    async getSummary(filters?: { startDate?: string; endDate?: string }) {
        const response = await axiosInstance.get(`${this.baseEndpoint}/summary`, {
            params: filters
        });
        return response.data;
    }
}

export const transactionService = new TransactionService();