import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import moment from "moment";

/*
Return value that the parameter had on previous render (default is null)
 */
export const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

/*
i18n date formatter
 */
export const useDate = () => {
  const { i18n } = useTranslation();

  const selectLocale = () => {
    const language = i18n.language;

    if (language.includes("en")) return enUS;
 
    return enUS;
  };

  const formatDate = (date?: Date | string | number, formatStr: string = "dd.MM.yyyy HH:mm:ss") => {
    return date ? format(new Date(date), formatStr, { locale: selectLocale() }) : null;
  };
// Function to check if a date is within a date range
const isBetweenDays = (date: string, start: string, end: string) => {
  const dateMoment = moment(date);
  const startMoment = moment(start);
  const endMoment = moment(end);
  return dateMoment.isBetween(startMoment, endMoment, 'day', '[]');
};
  return { formatDate ,isBetweenDays  };
};

export const useDebounce = (value: any, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};
