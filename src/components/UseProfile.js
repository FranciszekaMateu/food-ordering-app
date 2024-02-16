import { useState, useEffect } from "react";
export default function useProfile() {
  const [data, setData] = useState(false);
  const [Loading,setLoading] = useState(true);
  useEffect(() => {
      fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
         setLoading(false);
        });
  }, []);
  return {data,Loading}}
