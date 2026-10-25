import { useState } from 'react';
// NOTE: Тип намеренно минимальный. Хук не привязан к конкретному типу запроса. refetch из RTK Query подходит по форме (у результата есть then),
type Refetch = () => PromiseLike<unknown>;

// NOTE: Отдельный стейт нужен, потому что isFetching не различает, кто запустил запрос: жест пользователя, первая загрузка или фоновый перезапрос(фоновый перезапрос -Фаза 5)
export const useRefreshByUser = (refetches: Refetch[]) => {
  const [isRefreshingByUser, setIsRefreshingByUser] = useState(false);

  const refreshByUser = async () => {
    setIsRefreshingByUser(true);
    try {
      // NOTE: не использую catch, так как промисы refetch() не отклоняются при ошибке запроса. Ошибки показывает QueryStateView через isError хука запроса
      await Promise.all(refetches.map(refetch => refetch()));
    } finally {
      // NOTE: finally гарантирует, что спиннер остановится, даже если произойдёт что-то непредвиденное
      setIsRefreshingByUser(false);
    }
  };
  return { isRefreshingByUser, refreshByUser };
};
