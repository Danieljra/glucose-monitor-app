import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#61738D',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#0082CE',
    borderColor: '#0082CE',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#61738D',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
