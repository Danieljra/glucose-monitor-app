/* eslint-disable react-native/no-inline-styles */
import React, { memo, useCallback, useEffect } from 'react';
import { View, ScrollView, Text, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import LoadingSpinner from '../../components/atoms/LoadingSpinner/LoadingSpinner';
import { useGlucose } from '../../hooks/useGlucose';
import { useAuth } from '../../hooks/useAuth';
import { styles } from './styles';
import GlucoseChart from '../../components/organisms/GlucoseChart/GlucoseChart';

// PANTALLA PRINCIPAL CON GRÁFICO DE GLUCOSA
const HomeScreen = memo(() => {
  const { user, logout } = useAuth();
  const {
    data,
    isLoading,
    error,
    loadGlucoseData,
    hasData,
  } = useGlucose();

  // MANEJO EL REFRESH (PULL TO REFRESH)
  const onRefresh = useCallback(() => {
    loadGlucoseData();
  }, [loadGlucoseData]);


  const handleLogout = useCallback(() => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  }, [logout]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'Reintentar',
            onPress: () => loadGlucoseData(),
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    }
  }, [error, loadGlucoseData]);

  // LOADING INICIAL
  if (isLoading && !data) {
    return (
      <View style={styles.container}>
        <LoadingSpinner message="Cargando datos de glucosa..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={['#0082CE']}
            tintColor="#0082CE"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* ENCABEZADO DE BIENVENIDA */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>
                ¡Bienvenido, {user?.email.split('@')[0] || 'Usuario'}!
              </Text>
              <Text style={styles.subtitleText}>
                Aquí tienes tu monitoreo de glucosa
              </Text>
            </View>

            {/* BOTÓN LOGOUT */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 📊 GRÁFICO DE GLUCOSA */}
        {hasData ? (
          <GlucoseChart />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataTitle}>
              No hay datos disponibles
            </Text>
            <Text style={styles.noDataSubtitle}>
              No se encontraron registros de glucosa para hoy.
              Desliza hacia abajo para actualizar.
            </Text>
          </View>
        )}

        {/* INFORMACIÓN ADICIONAL */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Rangos de referencia</Text>
          <View style={styles.rangeItem}>
            <View style={[styles.colorIndicator, { backgroundColor: '#FF4444' }]} />
            <Text style={styles.rangeText}>Bajo: {'<'} 85 mg/dL</Text>
          </View>
          <View style={styles.rangeItem}>
            <View style={[styles.colorIndicator, { backgroundColor: '#0082CE' }]} />
            <Text style={styles.rangeText}>Normal: 85 - 110 mg/dL</Text>
          </View>
          <View style={styles.rangeItem}>
            <View style={[styles.colorIndicator, { backgroundColor: '#FFB800' }]} />
            <Text style={styles.rangeText}>Alto: {'>'} 110 mg/dL</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
});

HomeScreen.displayName = 'HomeScreen';
export default HomeScreen;
