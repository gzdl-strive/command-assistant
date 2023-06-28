import { useState, useCallback } from "react";

type LoadingParams = (...args: string[]) => Promise<unknown>;

const useLoading = (req: LoadingParams) => {
  const [loading, setLoading] = useState<boolean>(false);

  const wrapReq = useCallback(
    async (...args: string[]) => {
      setLoading(true);
      try {
        const data = await req(...args);
        setLoading(false);
        return await Promise.resolve(data);
      } catch (reason) {
        setLoading(false);
        return await Promise.reject(reason);
      }
    }, [req]);

  const result: [boolean, LoadingParams] = [loading, wrapReq];
  return result;
};

export default useLoading;