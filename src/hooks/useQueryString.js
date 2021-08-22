import {  useLocation } from "react-router-dom";

function useQueryString() {
  return new URLSearchParams(useLocation().search)
}

export default useQueryString;