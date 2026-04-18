export const calculatePagination = (
  page: number,
  limit: number
) => {
  const currentPage = Math.max(1, page);
  const perPage = Math.max(1, limit);
  const skip = (currentPage - 1) * perPage;

  return {
    page: currentPage,
    limit: perPage,
    skip,
  };
};