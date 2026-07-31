
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// export function timeAgo(iso: string): string {
//   const diff = Date.now() - new Date(iso).getTime()
//   const mins = Math.floor(diff / 60000)
//   if (mins < 1) return 'just now'
//   if (mins < 60) return `${mins}m ago`
//   const hours = Math.floor(mins / 60)
//   if (hours < 24) return `${hours}h ago`
//   const days = Math.floor(hours / 24)
//   if (days < 30) return `${days}d ago`
//   return formatDate(iso)
// }

export function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

