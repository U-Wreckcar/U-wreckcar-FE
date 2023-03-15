import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
export const useGetUtm = (api: any) => {
  // return useQuery(['utms'], async () => {
    // const { data } = await api;
    axios.get("../../public/data/getutm.json").then((result)=>{return result})
    // return data;
  // });
};
