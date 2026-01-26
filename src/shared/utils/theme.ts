import { WORLD_SETTINGS, FALLBACK_WORLD, WorldType } from '../constants/worlds';

export function getWorldTheme(worldName: string) {
  const theme = WORLD_SETTINGS[worldName as WorldType];
  return theme || FALLBACK_WORLD;
}
