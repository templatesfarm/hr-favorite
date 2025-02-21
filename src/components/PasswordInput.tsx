"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/appStore";
import env from "@/app/env";
import { useCustomToast } from "portfolioui";

const PasswordInput: React.FC = () => {
  const { isEditing, setIsEditing } = useAppStore();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { confirmationToast } = useCustomToast();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current) {
        setInputValue((prev) => "" + prev + event.key);
      }
    };

    const handlePaste = (event: ClipboardEvent) => {
      if (inputRef.current) {
        const pastedText = event.clipboardData?.getData("text") || "";
        setInputValue(pastedText);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  useEffect(() => {
    const validatePassword = async (pwd: string) => {
      try {
        const response = await fetch("/api/validation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: pwd }),
        });

        const data = await response.json();
        setInputValue("");
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
    };

    if (
      inputValue.length === env.password.length ||
      inputValue.length === env.accessKey.length
    ) {
      validatePassword(inputValue);
    }
  }, [confirmationToast, inputValue, setIsEditing]);

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
