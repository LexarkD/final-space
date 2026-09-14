import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { theme } from '../constants/theme';

export type IconProps = {
  style?: StyleProp<ViewStyle>;
  size?: number;
};

export const SettingIcon: React.FC<IconProps> = ({ style, size = 36 }) => {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 -960 960 960">
      <Path
        fill={theme.UI_COLOR_CONFIG.icon}
        d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z"
      />
    </Svg>
  );
};

export const FavoriteIcon: React.FC<IconProps> = ({ style, size = 36 }) => {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 -960 960 960">
      <Path
        fill={theme.UI_COLOR_CONFIG.icon}
        d="m323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"
      />
    </Svg>
  );
};

export const MenuIcon: React.FC<IconProps> = ({ style, size = 36 }) => {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 -960 960 960">
      <Path
        fill={theme.UI_COLOR_CONFIG.icon}
        d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"
      />
    </Svg>
  );
};

export const BackIcon: React.FC<IconProps> = ({ style, size = 36 }) => {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 -960 960 960">
      <Path
        fill={theme.UI_COLOR_CONFIG.icon}
        d="M655-80 255-480l400-400 56 57-343 343 343 343-56 57Z"
      />
    </Svg>
  );
};
