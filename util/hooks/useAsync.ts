import { useQuery } from '@tanstack/react-query';
import React from 'react';
export const useGetUtm = (api: any) => {
  return useQuery(['utms'], async () => {
    const { data } = await api;
    return data;
  });
};
