import moment from 'moment';

export const formatDate = (date: string) => {
  console.log('moment', moment(date).format());
  return moment(date).format('LLL');
};
