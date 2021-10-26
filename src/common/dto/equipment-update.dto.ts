export class EquipmentUpdateDto {
  readonly invNum?: string;
  readonly inspectDate?: Date;  // дата проверки
  readonly lastCheckoutDate?: Date; // дата последнего испытания. Формат в БД: ГГГГ-ММ-ДД  Пример: 2022-04-10
  readonly isGoodCondition?: boolean;   // рабочее состояние
  readonly notation?: string;      // заметки
}