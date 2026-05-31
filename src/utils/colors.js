export const CAT_COLORS = {
  dark:  { Frontend: '#C8FF00', Backend: '#FF4D4D', QA: '#8B5CF6' },
  light: { Frontend: '#3D7A00', Backend: '#C41200', QA: '#5B21B6' },
}

export const PROJECT_COLORS = {
  dark:  { '#C8FF00': '#C8FF00', '#FF4D4D': '#FF4D4D', '#8B5CF6': '#8B5CF6' },
  light: { '#C8FF00': '#3D7A00', '#FF4D4D': '#C41200', '#8B5CF6': '#5B21B6' },
}

export function getCatColor(cat, theme = 'dark') {
  return CAT_COLORS[theme]?.[cat] ?? CAT_COLORS.dark[cat] ?? '#888'
}

export function getProjectColor(colorKey, theme = 'dark') {
  return PROJECT_COLORS[theme]?.[colorKey] ?? colorKey
}
