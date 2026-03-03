import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import StoreMoney from '../StoreMoney.vue';
import { createTestingPinia } from '@pinia/testing';
import { useFinancialStore } from '@/stores/financialStore';
import CModal from '@/shared/components/CModal.vue';

// Mock do Vue Router
const mockRouter = {
  back: vi.fn(),
};

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}));

describe('StoreMoney.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mountComponent = () => {
    return mount(StoreMoney, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              financial: { // Assuming the store id is 'financial' from financialStore.ts
                recommendedDailyAmount: 20,
              },
            },
          }),
        ],
        components: {
          CModal,
        },
        stubs: {
          'q-spinner': true,
          'q-dialog': true,
          'q-img': true
        },
        renderStubDefaultSlot: true,
      },
    });
  };

  it('renderiza o valor recomendado corretamente', () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain('20');
  });

  it('exibe o modal de erro se o valor for preenchido com 0', async () => {
    const wrapper = mountComponent();
    const financialStore = useFinancialStore();

    const input = wrapper.find('input[type="number"]');
    await input.setValue('0');

    const button = wrapper.find('button.card__button');
    await button.trigger('click');

    expect(financialStore.deposit).not.toHaveBeenCalled();

    expect(wrapper.text()).toContain('Atenção!');
    expect(wrapper.text()).toContain('O valor para guardar deve ser maior que zero');
  });

  it('exibe o modal de erro se o valor for negativo', async () => {
    const wrapper = mountComponent();
    
    const input = wrapper.find('input[type="number"]');
    await input.setValue('-15');
    
    const button = wrapper.find('button.card__button');
    await button.trigger('click');

    expect(wrapper.text()).toContain('Atenção!');
  });

  it('chama a store e exibe o modal de sucesso se o valor for válido (>0)', async () => {
    const wrapper = mountComponent();
    const financialStore = useFinancialStore();
    
    vi.mocked(financialStore.deposit).mockResolvedValueOnce(undefined);

    const input = wrapper.find('input[type="number"]');
    await input.setValue('50');

    const button = wrapper.find('button.card__button');
    await button.trigger('click');

    expect(financialStore.deposit).toHaveBeenCalledWith(50);
    
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(wrapper.text()).toContain('Ótimo trabalho!');
    expect(wrapper.text()).toContain('Você está no caminho certo');
  });

  it('volta uma página (router.back) quando o modal de sucesso é fechado', async () => {
    const wrapper = mountComponent();
    const financialStore = useFinancialStore();
    
    vi.mocked(financialStore.deposit).mockResolvedValueOnce(undefined);

    const input = wrapper.find('input[type="number"]');
    await input.setValue('50');

    const button = wrapper.find('button.card__button');
    await button.trigger('click');
    
    await new Promise((resolve) => setTimeout(resolve, 0));

    const modals = wrapper.findAllComponents(CModal);
    await modals[0].vm.$emit('update:modelValue', false);

    expect(mockRouter.back).toHaveBeenCalledOnce();
  });
});
