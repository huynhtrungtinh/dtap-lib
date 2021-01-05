import {validateDate} from './validate-date';

function getMinutes2Dates(targetDay: Date | any): number {
  const today: any = new Date();
  const checkDate = validateDate(targetDay);
  if (checkDate.error) {
    return 0;
  }
  else {
    const diffMs: any = (targetDay - today);
    return Math.round(((diffMs % 86400000) % 3600000) / 60000);
  }
}
export default getMinutes2Dates;
export {getMinutes2Dates};

