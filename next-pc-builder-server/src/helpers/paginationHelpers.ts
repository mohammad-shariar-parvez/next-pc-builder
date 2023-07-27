import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionResult = {
  page: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionResult => {
  const page = Number(options.page || 1);

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,

    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
