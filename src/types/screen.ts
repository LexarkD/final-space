// NOTE: Объявляю глобальный тип. Эт позволит TypeScript автоматически подтягивать типы для хуков react-navigation
export type RootStackParamList = {
  Home: undefined;
  PictureDay: undefined;
  News: undefined;
  Setting: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
