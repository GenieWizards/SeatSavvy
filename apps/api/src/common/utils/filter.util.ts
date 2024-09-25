import { HTTP_STATUS, type TCommonQueryParams } from "@seatsavvy/types";

import { AppError } from "./appErr.util";

const set = (data: TCommonQueryParams) => {
  const {
    page = 1,
    limit = 20,
    search,
    order,
    sort,
    fromDate,
    toDate,
    category,
    location,
    price,
  } = data;

  const finalQuery = {
    page,
    limit,
  } as TCommonQueryParams;

  if (page) {
    finalQuery.page = page;
  }

  if (search) {
    finalQuery.search = search;
  }

  if (order) {
    finalQuery.order = order;
  }

  if (sort) {
    finalQuery.sort = sort;
  }

  if (fromDate && toDate) {
    if (fromDate > toDate) {
      throw new AppError({
        code: HTTP_STATUS.BAD_REQUEST,
        message: "From date cannot be greater than to date",
      });
    }
    finalQuery.fromDate = fromDate;
  }

  if (category) {
    finalQuery.category = category;
  }

  if (location) {
    finalQuery.location = location;
  }

  if (price) {
    finalQuery.price = price;
  }

  return finalQuery;
};

export default {
  set,
};
