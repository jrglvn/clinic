import React, { useEffect } from "react";
import moment from "moment";

export const parseServerDate = (date: number): string => {
  return moment(date, "x").format("DD.MM.YYYY hh:mm");
};

export const useClickOutside = (ref, onClickOutside, refExtra?) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (refExtra) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !refExtra.current.contains(event.target)
      ) {
        onClickOutside && onClickOutside();
      }
    } else if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside && onClickOutside();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};
