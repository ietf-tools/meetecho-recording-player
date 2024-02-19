import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setIsLoading(false);
        setData(data);
        setError();
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(t("str_fetchAborted", "the fetch was aborted"));
        } else {
          setIsLoading(false);
          setError(t("str_notFetchingData", "Could not fetch the data"));
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};
