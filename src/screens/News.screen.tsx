import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { useAppSelector } from '../hooks/redux.hooks';
import FastImage from '@d11/react-native-fast-image';
import { selectLastAPOD } from '../store/slices/apodSlice';
import { OfflineBanner } from '../components/OfflineBanner';
import { PictureDayImage } from '../components/PictureDayImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { AppText } from '../components/AppText';

export const NewsScreen: React.FC = () => {};
