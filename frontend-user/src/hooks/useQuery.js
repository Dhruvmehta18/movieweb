import { useLocation } from "react-router-dom";
import 'url-search-params-polyfill';

export default function useQuery() {
    return new URLSearchParams(useLocation().search);
  }