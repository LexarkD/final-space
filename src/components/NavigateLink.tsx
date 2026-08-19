import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { useLinkProps, NavigationAction } from '@react-navigation/native';

export interface NavigateLinkProps<
  // NOTE: Захватываю глобальные типы из RootParamList
  RouteName extends keyof ReactNavigation.RootParamList,
  // NOTE: Наследую поддержку дефолтных пропсов (style, onLongPress и т.д.), но исключаю конфликт самописного onPress и onPress из useLinkProps.
> extends Omit<PressableProps, 'onPress'> {
  screen: RouteName;

  params?: ReactNavigation.RootParamList[RouteName];
  action?: NavigationAction;
  children?: React.ReactNode;
  href?: string;
}

export const NavigateLink = <
  RouteName extends keyof ReactNavigation.RootParamList,
>({
  screen,
  params,
  action,
  href,
  children,
  style,
  ...props
}: NavigateLinkProps<RouteName>) => {
  const linkProps = useLinkProps({
    screen,
    params,
    action,
    href,
  } as any);

  return (
    <Pressable {...linkProps} {...props} style={style}>
      {children}
    </Pressable>
  );
};
