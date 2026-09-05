// export function formatMemberSince(dateString: any) {
//   const date = new Date(dateString);
//   const month = date.toLocaleString("default", { month: "short" });
//   const year = date.getFullYear();
//   return `${month} ${year}`;
// }

// export function formatPublishDate(dateString: any) {
//   const date = new Date(dateString);
//   const month = date.toLocaleString("default", { month: "short" });
//   const day = date.getDay();
//   const year = date.getFullYear();
//   return `${month} ${day} ${year}`;
// }

export function formatMemberSince(dateString: string | Date) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date); // Output: "Oct 2023"
}

export function formatPublishDate(dateString: string | Date) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date); // Output: "Oct 25, 2023"
}
