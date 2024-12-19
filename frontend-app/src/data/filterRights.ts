import { Right } from "@/data/rightsData";

export const filterRights = (data: Right[], filters: Partial<Right["filters"]>): Right[] => {
  return data.filter((right) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === null || value === undefined) return true; // Ignora filtros vazios
      return right.filters[key as keyof Right["filters"]] === value;
    })
  );
};
