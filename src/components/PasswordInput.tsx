"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/appStore";
import { useCustomToast } from "portfolioui";

const PasswordInput: React.FC = () => {
  const { isEditing, setIsEditing } = useAppStore();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { confirmationToast } = useCustomToast();

  const validatePassword = useCallback(
    async (pwd: string) => {
      try {
        const response = await fetch("/api/validation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: pwd }),
        });

        const data = await response.json();
        inputRef.current?.focus();
        if (response.ok) {
          setIsEditing(true);
        } else {
          console.log("Error validating password", data?.error);
          if (data?.count < 4) {
            confirmationToast({
              title: data?.error,
              subTitle: "Use AccessKey if password is forgotten.",
              isSuccess: false,
            });
          }
        }
      } catch (error) {
        console.log("Error Catch block password", (error as Error).message);
      }
      setInputValue("");
    },
    [confirmationToast, setIsEditing]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current) {
        if (event.key === "Enter") {
          validatePassword(inputValue);
        } else {
          setInputValue((prev) => "" + prev + event.key);
        }
      }
    };

    const handlePaste = (event: ClipboardEvent) => {
      if (inputRef.current) {
        const pastedText = event.clipboardData?.getData("text") || "";
        setInputValue(pastedText);
        validatePassword(pastedText);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("paste", handlePaste);
    };
  }, [inputValue, validatePassword]);

  return (
    <>
      {!isEditing && (
        <input
          type="password"
          ref={inputRef}
          value={""}
          onChange={(event) => setInputValue(event?.target.value)}
          style={{ position: "absolute", top: "-9999px", left: "-9999px" }} // Hide the input field
        />
      )}
    </>
  );
};

export default PasswordInput;
