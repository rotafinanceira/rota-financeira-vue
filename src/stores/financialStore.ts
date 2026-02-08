import { defineStore } from 'pinia';
import { FinancialService, type DailyCheck } from '@/services/FinancialService';
import { useCarStore } from './carStore';

export const useFinancialStore = defineStore('financial', {
    state: () => ({
        recommendedDailyAmount: 0,
        maintenanceBalance: 0, // Note: This balance comes from the car entity, not directly from a finance endpoint in the initial analysis, but we might need to fetch it.
        checkInHistory: [] as DailyCheck[],
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
            } catch (err) {
                this.error = (err as Error).message || 'Error fetching recommended amount';
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
            } catch (err) {
                this.error = (err as Error).message || 'Error fetching balance';
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
            } catch (err) {
                this.error = (err as Error).message || 'Error fetching check-in history';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchFinancialSummary() {
            const carStore = useCarStore();
            const licensePlate = carStore.car?.license_plate;

            if (!licensePlate) {
                console.warn('No car license plate found.');
                return;
            }

            this.isLoading = true;
            this.error = null;
            try {
                const summary = await FinancialService.getFinancialSummary(licensePlate);
                this.recommendedDailyAmount = summary.recommendedDailyAmount;
                this.maintenanceBalance = summary.balance;
                this.checkInHistory = summary.checkInHistory;
            } catch (err) {
                this.error = (err as Error).message || 'Error fetching financial summary';
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
            } catch (err) {
                this.error = (err as Error).message || 'Error depositing amount';
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
            } catch (err) {
                this.error = (err as Error).message || 'Error debiting amount';
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
