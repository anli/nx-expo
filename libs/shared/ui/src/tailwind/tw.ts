import { create } from 'twrnc';

import { darkTheme, lightTheme } from '../config/theme';

import { adaptTailwindTheme } from './adapt-tailwind-theme';

const theme = adaptTailwindTheme(lightTheme, darkTheme);

export const tw = create({ theme });
