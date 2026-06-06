import { ToValues } from '../utils/type-helpers.util';

export const dataLoadStatuses = {
  /** Не использовать нигде, кроме initialState или очистки стейта.
   * Этот статус нужен просто чтобы не добавлять к типу данных undefined или null как показатель что они ещё не загружаются.
   */
  INIT: 'INIT',
  /** Идёт загрузка (показать скелетон или лоадер) */
  LOADING: 'LOADING',
  /** Загрузка успешно завершена, данные есть */
  WITH_DATA: 'WITH_DATA',
  /** Загрузка успешно завершена, данных нет */
  NO_DATA: 'NO_DATA',
  /** Ошибка при загрузке */
  ERROR: 'ERROR',
};

export type DataLoadStatus = ToValues<typeof dataLoadStatuses>;
