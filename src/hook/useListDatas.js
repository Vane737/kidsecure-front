import { useState, useEffect } from "react";
import api from '../api/kidsecureApi';

export const useListDatas = (url = '') => {
  const [listData,setListData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [status, setStatus] = useState(0);

  const getData = async()=>{
    const {data, status} = await api.get(url);
    setLoading(false);
    setListData(data);
    setStatus(status);
  }
  useEffect(() => {
    getData();
  }, [])
  return {
    listData,
    status,
    loading,
  }
}