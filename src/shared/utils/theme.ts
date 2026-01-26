import { WORLD_SETTINGS, FALLBACK_WORLD, WorldType } from '../constants/worlds'

export function getWorldTheme(worldName: string) {
  const normalizedName = worldName?.charAt(0).toUpperCase() + worldName?.slice(1).toLowerCase()
  const theme = WORLD_SETTINGS[normalizedName as WorldType]
  return theme || FALLBACK_WORLD
}
