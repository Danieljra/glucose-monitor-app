import { useEffect, useCallback } from 'react';
import { fetchGlucoseData } from '../store/slices/glucoseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useGlucose = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error, selectedTimeRange } = useSelector((state: RootState) => state.glucose);
  const { user } = useSelector((state: RootState) => state.auth);

  const loadGlucoseData = useCallback(() => {
    if (!user?._id) {return;}

    const targetDate = '2025-06-05';
    dispatch(fetchGlucoseData({
      userId: user._id,
      date: targetDate,
    }));
  }, [dispatch, user?._id]);

  // CARGAR DATOS INICIALES
  useEffect(() => {
    loadGlucoseData();
  }, [loadGlucoseData]);


  return {
    data,
    isLoading,
    error,
    selectedTimeRange,
    loadGlucoseData,
    hasData: data?.data?.data && data.data.data.length > 0,
  };
};
