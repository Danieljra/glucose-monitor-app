import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { setTimeRange } from '../../../store/slices/glucoseSlice';
import TimeRangeTab from '../../atoms/TimeRangeTab/TimeRangeTab';
import { styles } from './styles';
import { AppDispatch, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { TIME_RANGES } from '../../../constants/tabs';


const TimeRangeTabs = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTimeRange } = useSelector((state: RootState) => state.glucose);

  const handleTimeRangeChange = useCallback((range: '6h' | '12h' | '24h') => {
    dispatch(setTimeRange(range));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {TIME_RANGES.map((range) => (
        <TimeRangeTab
          key={range.key}
          label={range.label}
          active={selectedTimeRange === range.key}
          onPress={() => handleTimeRangeChange(range.key)}
        />
      ))}
    </View>
  );
});

TimeRangeTabs.displayName = 'TimeRangeTabs';
export default TimeRangeTabs;
