export function formatMemberSince(dateString: any) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export function formatPublishDate(dateString: any) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDay();
  const year = date.getFullYear();
  return `${month} ${day} ${year}`;
}
