// frontend/src/hooks/useFeatureHeader.js
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function useFeatureHeader(header) {
  const context = useOutletContext();
  const setHeader = context?.setHeader;

  useEffect(() => {
    if (!setHeader) return;
    setHeader(header);
    return () => setHeader({});
  }, [setHeader, header]);
}
