import { Theme } from '../config/theme';

export const adaptTailwindTheme = (lightTheme: Theme, darkTheme: Theme) => {
  const colors = {
    ...Object.fromEntries(
      Object.entries(lightTheme?.colors).filter(
        ([_, v]) => typeof v === 'string'
      )
    ),
    ...Object.fromEntries(
      Object.entries(darkTheme?.colors)
        .filter(([_, v]) => typeof v === 'string')
        .map(([k, v]) => [`dark-${k}`, v])
    ),
  };

  return {
    colors,
  };
};
