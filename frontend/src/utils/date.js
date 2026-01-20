export function formatDate(value) {
  try {
    return new Date(value).toLocaleString("es-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return value ?? "";
  }
}

export function formatDateDay(value) {
  try {
    return new Date(value).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return value ?? "";
  }
}
