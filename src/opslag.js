export function laad(sleutel) {
  try {
    return JSON.parse(localStorage.getItem(sleutel)) ?? []
  } catch {
    return []
  }
}

export function bewaar(sleutel, waarde) {
  localStorage.setItem(sleutel, JSON.stringify(waarde))
}
