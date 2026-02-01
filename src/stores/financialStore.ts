import { defineStore } from 'pinia';
import { FinancialService } from '@/services/FinancialService';
import { useCarStore } from './carStore';

export const useFinancialStore = defineStore('financial', {
    state: () => ({
        recommendedDailyAmount: 0,
        maintenanceBalance: 0, // Note: This balance comes from the car entity, not directly from a finance endpoint in the initial analysis, but we might need to fetch it.
        checkInHistory: [] as any[],
        isLoading: false,
        error: null as string | null,
    }),
    getters: {
        licensePlate(): string | undefined {
            const carStore = useCarStore();
            return carStore.car?.license_plate;
        }
    },
    actions: {
        async fetchRecommendedDailyAmount() {
            const carStore = useCarStore();
            const licensePlate = carStore.car?.license_plate;

            if (!licensePlate) {
                console.warn('No car license plate found.');
                return;
            }

            this.isLoading = true;
            this.error = null;
            try {
                const amount = await FinancialService.getRecommendedDailyAmount(licensePlate);
                this.recommendedDailyAmount = amount;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                this.error = err.message || 'Error fetching recommended amount';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchBalance() {
            const carStore = useCarStore();
            const licensePlate = carStore.car?.license_plate;

            if (!licensePlate) {
                console.warn('No car license plate found.');
                return;
            }

            this.isLoading = true;
            this.error = null;
            try {
                const balance = await FinancialService.getBalance(licensePlate);
                this.maintenanceBalance = balance;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                this.error = err.message || 'Error fetching balance';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchCheckInHistory() {
            const carStore = useCarStore();
            const licensePlate = carStore.car?.license_plate;

            if (!licensePlate) {
                console.warn('No car license plate found.');
                return;
            }

            this.isLoading = true;
            this.error = null;
            try {
                const history = await FinancialService.getCheckInHistory(licensePlate);
                this.checkInHistory = history;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                this.error = err.message || 'Error fetching check-in history';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        async deposit(amount: number) {
            const carStore = useCarStore();
            const licensePlate = carStore.car?.license_plate;

            if (!licensePlate) {
                throw new Error('No car license plate found.');
            }

            this.isLoading = true;
            this.error = null;
            try {
                await FinancialService.deposit({
                    amount,
                    carLicensePlate: licensePlate,
                });
                await this.fetchBalance();
                await this.fetchRecommendedDailyAmount();
                await this.fetchCheckInHistory();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                this.error = err.message || 'Error depositing amount';
                throw err;
            } finally {
                this.isLoading = false;
            }
        },

        async debit(amount: number) {
            const carStore = useCarStore();
            const licensePlate = carStore.car?.license_plate;

            if (!licensePlate) {
                throw new Error('No car license plate found.');
            }

            this.isLoading = true;
            this.error = null;
            try {
                await FinancialService.debit({
                    amount,
                    carLicensePlate: licensePlate,
                });
                await this.fetchBalance();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                this.error = err.message || 'Error debiting amount';
                throw err;
            } finally {
                this.isLoading = false;
            }
        },

        async setBalance(targetAmount: number) {
            if (this.maintenanceBalance === targetAmount) return;

            const diff = targetAmount - this.maintenanceBalance;

            if (diff > 0) {
                await this.deposit(diff);
            } else {
                await this.debit(Math.abs(diff));
            }
        }
    },
});
