interface IENVIRONMENT {  
  BASE_URL: {
    API: string;
  };
}

export const ENVIRONMENTS: IENVIRONMENT = {
  BASE_URL: {
    API: import.meta.env.VITE_WELLAT_API_URL as string,
  },
};
