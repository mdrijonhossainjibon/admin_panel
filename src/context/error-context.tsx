import React from "react";
import { message } from "antd";
import { useAuthContext } from "./auth-context";
import { useTranslation } from "react-i18next";

type ErrorContextType = {
  addError: (error: string) => void;
  handleApolloError: (error: any) => void;
};

const defaultErrorContext: ErrorContextType = {
  addError: () => {},
  handleApolloError: () => {},
};

const ErrorContext = React.createContext<ErrorContextType>(defaultErrorContext);

type Props = {
  children: React.ReactNode;
};

export const ErrorContextProvider = ({ children }: Props) => {
  const { logoutUser } = useAuthContext();
  const { t } = useTranslation();

  const errorMessagePrefix = "setter.error.";
  const translateError = (id: string) => t(`${errorMessagePrefix}${id}`);

  const handleApolloError = (e: any) => {
    if (e) {
      const translatedError = translateError(e.message);
      const networkError = e.networkError;
      const serverParseError = networkError?.statusCode;

      // Check for specific status codes that require logging out the user
      if (serverParseError && [401, 404].indexOf(serverParseError) > -1) {
        console.log("NEED LOGOUT");
        logoutUser();
      }

      // Display the error message
      message.error(translatedError || e.message || t("An unknown error occurred"));
    }
  };

  return (
    <ErrorContext.Provider
      value={{
        addError: (error: string) => {
          message.error(translateError(error) || error);
        },
        handleApolloError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => React.useContext(ErrorContext);
