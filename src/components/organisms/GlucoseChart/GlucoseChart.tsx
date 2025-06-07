/* eslint-disable react-native/no-inline-styles */
import React, { memo, useMemo, useCallback, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
  Line,
  Circle,
  Text as SvgText,
} from 'react-native-svg';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPoint } from '../../../store/slices/glucoseSlice';
import TimeRangeTabs from '../../molecules/TimeRangeTabs/TimeRangeTabs';
import { styles } from './styles';
import { RootState, AppDispatch } from '../../../store';
import { getGlucoseColor } from '../../../utils/chart';

const { width: screenWidth } = Dimensions.get('window');
const CHART_WIDTH = screenWidth - 40;
const CHART_HEIGHT = 300;
const PADDING = { top: 30, right: 20, bottom: 50, left: 50 };

const GlucoseChart = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, selectedTimeRange, selectedPoint } = useSelector((state: RootState) => state.glucose);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // PROCESO LOS DATOS PARA EL GRÁFICO
  const chartData = useMemo(() => {
    if (!data?.data?.data) {return null;}


    // NO filtrar por tiempo actual, usar todos los datos del día
    const allData = [...data.data.data].sort((a, b) => a.dateUnix - b.dateUnix);

    // Filtrar solo por rango horario si es necesario
    let filteredData = allData;

    if (selectedTimeRange !== '24h') {
      // Tomo las últimas N horas de datos disponibles
      const hours = selectedTimeRange === '6h' ? 6 : 12;
      const totalHours = 24;
      const dataToTake = Math.floor((hours / totalHours) * allData.length);
      filteredData = allData.slice(-dataToTake); // Últimos N puntos
    }


    if (filteredData.length === 0) {return null;}

    // Calcular dimensiones del área del gráfico
    const chartAreaWidth = CHART_WIDTH - PADDING.left - PADDING.right;
    const chartAreaHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

    // Rangos Y fijos
    const minY = 50;
    const maxY = 150;

    // Procesar puntos
    const points = filteredData.map((point, index) => {
      const x = PADDING.left + (index / Math.max(1, filteredData.length - 1)) * chartAreaWidth;
      const normalizedY = (point.value - minY) / (maxY - minY);
      const y = PADDING.top + (1 - normalizedY) * chartAreaHeight;

      const timeString = point.date
        ? dayjs(point.date).format('HH:mm')
        : point.dateUnix > 0
          ? dayjs(point.dateUnix * 1000).format('HH:mm')
          : '00:00';

      return {
        x,
        y,
        value: point.value,
        time: timeString,
        color: getGlucoseColor(point.value),
        originalIndex: index,
      };
    });

    // Creacion del path suave para la línea
    let pathData = '';
    if (points.length > 0) {
      pathData = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        const curr = points[i];
        const prev = points[i - 1];

        // Curva suave usando quadratic bezier
        const cpx = prev.x + (curr.x - prev.x) * 0.5;
        const cpy = prev.y + (curr.y - prev.y) * 0.5;
        pathData += ` Q ${cpx} ${cpy} ${curr.x} ${curr.y}`;
      }
    }

    // Genero los segmentos coloreados
    const coloredSegments = [];
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const avgValue = (prev.value + curr.value) / 2;

      coloredSegments.push({
        x1: prev.x,
        y1: prev.y,
        x2: curr.x,
        y2: curr.y,
        color: getGlucoseColor(avgValue),
      });
    }

    // LABELS DEL EJE X
    const xLabels = [];
    const step = Math.max(1, Math.floor(filteredData.length / 6));

    for (let i = 0; i < filteredData.length; i += step) {
      if (i < filteredData.length) {
        const dataPoint = filteredData[i];

        const time = dayjs(dataPoint.date || dataPoint.dateUnix * 1000).format('HH:mm');

        const x = PADDING.left + (i / Math.max(1, filteredData.length - 1)) * chartAreaWidth;
        xLabels.push({ x, time });
      }
    }


    // Labels del eje Y
    const yLabels = [];
    for (let value = 200; value >= 50; value -= 30) {
      const normalizedY = (value - minY) / (maxY - minY);
      const y = PADDING.top + (1 - normalizedY) * chartAreaHeight;
      yLabels.push({ y, value });
    }

    return {
      points,
      pathData,
      coloredSegments,
      xLabels,
      yLabels,
      originalData: filteredData,
    };
  }, [data, selectedTimeRange]);

  // MANEJO EL CLICK EN PUNTO
  const handlePointPress = useCallback((pointData: any, index: number) => {
    setSelectedIndex(index);
    dispatch(setSelectedPoint({
      value: pointData.value,
      time: pointData.time,
      index: pointData.originalIndex,
    }));
  }, [dispatch]);

  if (!data || !chartData) {
    return (
      <View style={styles.container}>
        <TimeRangeTabs />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay datos disponibles</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TimeRangeTabs />

      {/* 🎯 VALOR SELECCIONADO */}
      {selectedPoint && (
        <View style={styles.topValueContainer}>
          <Text style={styles.topValue}>{selectedPoint.value}</Text>
          <Text style={styles.topUnit}>mg/dL</Text>
          <Text style={styles.topTime}>{selectedPoint.time}</Text>
        </View>
      )}

      {/* 📊 GRÁFICO SVG */}
      <View style={styles.chartContainer}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          {/* 🎨 DEFINIR GRADIENTE */}
          <Defs>
            <SvgLinearGradient id="backgroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#1a237e" stopOpacity="1" />
              <Stop offset="100%" stopColor="#3949ab" stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>

          {/* 🌌 FONDO */}
          <Rect
            x="0"
            y="0"
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            fill="url(#backgroundGradient)"
            rx="12"
          />

          {/* 📏 GRID HORIZONTAL */}
          {chartData.yLabels.map((label, index) => (
            <Line
              key={`grid-${index}`}
              x1={PADDING.left}
              y1={label.y}
              x2={CHART_WIDTH - PADDING.right}
              y2={label.y}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}

          {/* 📏 LABELS EJE Y */}
          {chartData.yLabels.map((label, index) => (
            <SvgText
              key={`y-label-${index}`}
              x={PADDING.left - 10}
              y={label.y + 5}
              fill="rgba(255, 255, 255, 0.8)"
              fontSize="12"
              textAnchor="end"
            >
              {label.value}
            </SvgText>
          ))}

          {/* 📈 SEGMENTOS DE LÍNEA COLOREADOS */}
          {chartData.coloredSegments.map((segment, index) => (
            <Line
              key={`segment-${index}`}
              x1={segment.x1}
              y1={segment.y1}
              x2={segment.x2}
              y2={segment.y2}
              stroke={segment.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}

          {/* 🔘 PUNTOS INVISIBLES PARA INTERACCIÓN */}
          {chartData.points.map((point, index) => (
            <Circle
              key={`touch-point-${index}`}
              cx={point.x}
              cy={point.y}
              r={15}
              fill="transparent"
              stroke="transparent"
              onPress={() => handlePointPress(point, index)}
            />
          ))}

          {/* 📏 SCRUBBER (LÍNEA VERTICAL) */}
          {selectedIndex >= 0 && chartData.points[selectedIndex] && (
            <Line
              x1={chartData.points[selectedIndex].x}
              y1={PADDING.top}
              x2={chartData.points[selectedIndex].x}
              y2={CHART_HEIGHT - PADDING.bottom}
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
          )}

          {/* 📅 LABELS EJE X */}
          {chartData.xLabels.map((label, index) => (
            <SvgText
              key={`x-label-${index}`}
              x={label.x}
              y={CHART_HEIGHT - PADDING.bottom + 20}
              fill="rgba(255, 255, 255, 0.8)"
              fontSize="10"
              textAnchor="middle"
            >
              {label.time}
            </SvgText>
          ))}
        </Svg>
      </View>

      {/* 🎨 LEYENDA */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFB800' }]} />
          <Text style={styles.legendText}>Alto (&gt;110)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#0082CE' }]} />
          <Text style={styles.legendText}>Normal (85-110)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF4444' }]} />
          <Text style={styles.legendText}>Bajo (&lt;85)</Text>
        </View>
      </View>
    </View>
  );
});

GlucoseChart.displayName = 'GlucoseChart';
export default GlucoseChart;
