export const formatDate = (dateString: string | undefined, year: boolean) => {
  if (!dateString) return 'N/A';

  if (year) return new Date(dateString).getFullYear();
  return new Date(dateString).toLocaleDateString();
};