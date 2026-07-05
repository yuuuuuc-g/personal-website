const labels: Record<string, string> = {
  seed: "Seed",
  sapling: "Sapling",
  evergreen: "Evergreen",
};

export function StatusBadge({ status }: { status?: string | null }) {
  if (!status) {
    return null;
  }

  return <span className="badge">{labels[status] || status}</span>;
}
