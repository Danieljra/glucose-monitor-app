import React, { memo } from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { styles } from './styles';

interface TimeRangeTabProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const TimeRangeTab: React.FC<TimeRangeTabProps> = memo(({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, active && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabText, active && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
});

TimeRangeTab.displayName = 'TimeRangeTab';
export default TimeRangeTab;
