import React, { useMemo } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null | undefined;
  hasSubmitted?: boolean;
}

export const Input = ({ hasSubmitted, error, ...inputProps }: InputProps) => {
  const hasError = useMemo(
    () => !!error && hasSubmitted,
    [error, hasSubmitted]
  );

  return (
    <>
      <input
        className={`form__input ${hasError ? "form__input-error" : ""}`}
        {...inputProps}
      />
      {hasError && <p className="error">{error}</p>}
    </>
  );
};
