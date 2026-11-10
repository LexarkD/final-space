// src/screens/FetchLab.screen.tsx (временный экран для экспериментов)
import React from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBaseRequest } from '../api/baseRequest';
import type { PaginatedArticleListRead } from '../types/newsApiType';

const newsRequest = createBaseRequest('https://api.spaceflightnewsapi.net');
const nasaSiteRequest = createBaseRequest('https://science.nasa.gov');

export const FetchLabScreen: React.FC = () => {
  // NOTE: async нужен ради await. onPress вызывает функцию, и в этот момент уходит запрос
  const runOk = async () => {
    const result = await newsRequest<PaginatedArticleListRead>({
      url: '/v4/articles/',
      params: { limit: 1, search: undefined },
    });
    console.log('200:', result);
  };

  const runNotFound = async () => {
    const result = await newsRequest({ url: '/v4/articles/999999999/' });
    console.log('404:', result);
  };

  const runHtml = async () => {
    const result = await nasaSiteRequest({ url: '/' });
    console.log('HTML:', result);
  };

  const runTimeout = async () => {
    const result = await newsRequest({ url: '/v4/articles/', timeoutMs: 1 });
    console.log('timeout:', result);
  };

  return (
    <SafeAreaView>
      <Button title="200 OK" onPress={runOk} />
      <Button title="404" onPress={runNotFound} />
      <Button title="HTML вместо JSON" onPress={runHtml} />
      <Button title="Таймаут 1 мс" onPress={runTimeout} />
    </SafeAreaView>
  );
};
