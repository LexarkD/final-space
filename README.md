# FinalSpace

Проект построен на базе React native (без Expo) и TypeScript. Основной фокус: клиент-серверное взаимодействие на RTK Query.

Настройка окружения для разработки и запуска проекта: https://reactnative.dev/docs/set-up-your-environment

Требуется Node.js >= 22.11. Ключи API не нужны: оба используемых API публичные.

# Как начать

## Установка зависимостей: npm, ruby/bundler, CocoaPods

```sh

npm install

bundle install

npm run pods

```

## Запустить metro-сервер в дев. режиме

```sh

npm start

```

Запуск со сбросом кэша Metro и watchman:

```sh

npm run start-clean

```

## Запуск проекта iOS

```sh

npm run ios

```

Запуск на конкретном симуляторе:

```sh

npm run ios-se    # iPhone SE (3rd generation)

npm run ios-pro   # iPhone 16 Pro

```

Очистка нативной сборки iOS:

```sh

npm run ios-clean

```

## Запуск проекта Android

```sh

npm run android

```

Очистка нативной сборки Android:

```sh

npm run android-clean

```

## Проверка кода

```sh

npm run typecheck

npm run lint

```

## Генерация клиента Spaceflight News API

```sh

npm run api-generate

```

Команда генерирует `src/api/newsOpenApi.ts` по OpenAPI-схеме сервера (настройки в `openapi-config.ts`). Сгенерированный файл не редактируется вручную: при следующей генерации он будет перезаписан.

# О приложении

FinalSpace — приложение о космосе. Показывает астрономическое фото дня от NASA и свежие новости космической отрасли.

Главный экран показывает превью фото дня и последней новости.

Экран «Фото дня» показывает изображение, заголовок, дату, описание и ссылку на публикацию на сайте NASA. Если в этот день NASA опубликовало видео или другой материал, который нельзя показать в приложении, вместо изображения выводится заглушка.

Экран новостей показывает список статей с постраничной навигацией. Статья открывается в браузере.

На всех экранах с данными работает pull-to-refresh.

## Источники данных

NASA APOD (новый API): https://science.nasa.gov/wp-json/wp/v2/apod-basic

Spaceflight News API v4: https://spaceflightnewsapi.net

## Используемый технический стек

### Работа с сервером и управление состоянием

@reduxjs/toolkit (RTK Query)

react-redux

@rtk-query/codegen-openapi

### Навигация

react-navigation (native-stack, static API)

react-native-screens

### Интерфейс

react-native-safe-area-context

react-native-svg

### Качество кода

TypeScript

ESLint

Prettier
