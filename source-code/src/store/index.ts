import { createPinia } from "pinia";

const pinia = createPinia();

export interface IStoreState {
  isLoading: boolean;
  error: string | undefined;
}

export default pinia;
