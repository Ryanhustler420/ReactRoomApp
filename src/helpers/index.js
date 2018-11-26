import titlelize from 'titlelize';
import * as moment from 'moment';

export const rentalType = isShared => isShared ? 'shared' : 'entire';

export const toUpperCase = value => value ? titlelize(value) : '';

export const pretifyDate = date => moment(date).format('MMM Do YY');

// Y/MM/DD <- dateFormat
export const getRangeOfDates = (startAt, endAt, dateFormat = 'YYYY-MM-DD') => {
    const tempdates = [];

    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while(mStartAt < mEndAt){
        tempdates.push(mStartAt.format(dateFormat));
        mStartAt = mStartAt.add(1, 'day');
    }

    tempdates.push(mEndAt.format(dateFormat));

    return tempdates;

}