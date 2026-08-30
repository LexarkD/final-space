// NOTE: Объявляю глобальный тип. Эт позволит TypeScript автоматически подтягивать типы для хуков react-navigation
export type RootStackParamList = {
  Home: undefined;
  Gallery: undefined;
  Setting: undefined;
  PictureDay: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
