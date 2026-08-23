import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store.ts';

// NOTE: Создаю типизированные версии redux hooks

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
