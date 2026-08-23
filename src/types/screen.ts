// NOTE: Объявляю глобальный тип. Эт позволит TypeScript автоматически подтягивать типы для хуков react-navigation
export type RootStackParamList = {
  Home: undefined;
  Gallery: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
