import { StyleSheet } from 'react-native';

const CHART_HEIGHT = 300;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a237e',
    borderRadius: 16,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyContainer: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // VALOR SUPERIOR
  topValueContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
  },
  topValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  topUnit: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: -5,
  },
  topTime: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },

  // GRÁFICO
  chartContainer: {
    flexDirection: 'row',
    height: CHART_HEIGHT,
    marginVertical: 0,
  },
  yAxisContainer: {
    width: 40,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  yAxisLabel: {
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  yAxisText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  chartArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  chartScroll: {
    flex: 1,
  },
  lineContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  lineSegment: {
    position: 'absolute',
    height: 3,
    borderRadius: 1.5,
  },
  dataPoint: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedPointInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  scrubberLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },

  // EJE X
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 8,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },

  // LEYENDA
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
