"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (page, limit) => {
    const currentPage = Math.max(1, page);
    const perPage = Math.max(1, limit);
    const skip = (currentPage - 1) * perPage;
    return {
        page: currentPage,
        limit: perPage,
        skip,
    };
};
exports.calculatePagination = calculatePagination;
