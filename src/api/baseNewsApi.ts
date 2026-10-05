import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseNewsApi = createApi({
  reducerPath: 'baseNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spaceflightnewsapi.net' }),
  endpoints: () => ({}),
});

// NOTE: схема реализуемой архитектуры Split API + OpenAPI codegen
// baseNewsApi.ts — низкоуровневый HTTP-транспорт. Ничего не знает про эндпоинты, контракты, данные, новости. Знает только baseUrl и генерирует инфраструктурный "скелет".
// baseNewsApi.ts генерирует Redux-инфраструктуру:
//- baseNewsApi.reducer - управляет ВРЕМЕННЫМИ СЛУЖЕБНЫМИ данными. Хранит логику обновления этих данных. Ловит экшен для обновления этих данных в СЛУЖЕБНОЙ ветке redux store -> [baseNewsApi.reducerPath]: baseNewsApi.reducer
//- baseNewsApi.middleware - мидлвара для отслеживания жизненного цикла запроса, подписок и таймеров
//- injectEndpoints - метод для расширения эндпоинтов
// ->
// newsOpenApi.ts — cгенерированная OpenAPI-база. Остается нетронутой. Знает про сырые контракты сервера, знает типы. Ничего не знaет о том, как я планирую их использовать
// ->
// newsPreviewApi.ts - Семантический слой бизнес-логики. Реализует бизнес-логику - валидирует и трансформирует данные, генерирует интерфейс (useGetNewsPreviewQuery()) для тригера вызова в UI.

// NOTE: Под капотом .injectEndpoints() не создает новых объектов с отдельным кешем. По сути имеется один расширяемый объект baseNewsApi
