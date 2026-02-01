import { api } from '@/boot/axios';

const baseApi = import.meta.env.VITE_ROTA_API;
console.log('[FinancialService] Using baseApi:', baseApi);

export interface DailyCheck {
    id?: string;
    userId: string;
    carLicensePlate: string;
    deposited: boolean;
    amountDeposited: number;
    date: string | Date;
}

export class FinancialService {
    static async deposit(payload: {
        amount: number;
        carLicensePlate: string;
    }): Promise<void> {
        await api().post(`${baseApi}/v1/financial/deposit/${payload.carLicensePlate}`, {
            amount: payload.amount,
        });
    }

    static async debit(payload: {
        amount: number;
        carLicensePlate: string;
    }): Promise<void> {
        await api().post(`${baseApi}/v1/financial/debit/${payload.carLicensePlate}`, {
            amount: payload.amount,
        });
    }

    static async getRecommendedDailyAmount(carLicensePlate: string): Promise<number> {
        const { data } = await api().get<{ value: number }>(
            `${baseApi}/v1/financial/recomended-amount-to-save/${carLicensePlate}`
        );
        return data.value;
    }

    static async getBalance(carLicensePlate: string): Promise<number> {
        const { data } = await api().get<{ value: number }>(
            `${baseApi}/v1/financial/balance/${carLicensePlate}`
        );
        return data.value;
    }

    static async getCheckInHistory(carLicensePlate: string): Promise<DailyCheck[]> {
        const { data } = await api().get<DailyCheck[]>(
            `${baseApi}/v1/financial/check-in-history/${carLicensePlate}`
        );
        return data;
    }
}
