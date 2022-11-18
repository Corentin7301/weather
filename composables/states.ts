import dayjs from 'dayjs'
import 'dayjs/locale/fr'
// date of the choiced day
export let useDateNow = () => useState < Object > ('dateNow', () => (dayjs().locale('fr')))

// weather datas setter
export const setWeatherDatas = (weatherFetchedDatas: Object) => (
    useWeatherDatas().value = weatherFetchedDatas
);
// weather datas getter
export const useWeatherDatas = () => useState < Object > ('weatherFetchedDatas', () => (null));

// period items of the user can choose
export const usePeriodItems = () => useState < Object > ('periodItems', () => ([{
        label: 'Aujourd\'hui',
        value: 'today',
        index: 0
    },
    {
        label: 'Demain',
        value: 'tomorrow',
        index: 1
    },
    {
        label: '7 prochains jours',
        value: 'in-7-days',
        index: 2
    },
]))

// user's choiced period getter
export const usePeriodChoiced = () => useState < Object > ('periodChoiced', () => ({}));
// data's display type
export const useDisplayType = () => useState < Object > ('displayType', () => "hourly");

// user's choiced period setter
export const setPeriodChoice = (period: Object) => {
    switch (period.value) {
        case 'today':
            usePeriodChoiced().value = usePeriodItems().value[0]
            setSunTimes(period.index)
            useDisplayType().value = "hourly"
            useDateNow().value = dayjs().locale('fr')
            break;
        case 'tomorrow':
            usePeriodChoiced().value = usePeriodItems().value[1]
            setSunTimes(period.index)
            useDisplayType().value = "hourly"
            useDateNow().value = dayjs().locale('fr').add(1, 'day')
            break;
        case 'in-7-days':
            usePeriodChoiced().value = usePeriodItems().value[2]
            useDisplayType().value = "daily"
            break;
        default:
            usePeriodChoiced().value = usePeriodItems().value[0]
            useDisplayType().value = "hourly"
            setSunTimes(0)
            break;
    }
}


// sun times getter
export const useSunTimes = () => useState < Object > ('sunTimes', () => ({}));

//sun times setter
export const setSunTimes = (periodIndex: Number) => {
    const sunTimeMethod = () => {
        useSunTimes().value = {
            sunrise: useWeatherDatas().value.days[periodIndex].sunrise.slice(0, 2),
            sunset: useWeatherDatas().value.days[periodIndex].sunset.slice(0, 2),
        }
    }
    switch (periodIndex) {
        case 0:
            sunTimeMethod()
            break;
        case 1:
            sunTimeMethod()
            break;
        default:
            sunTimeMethod()
            break;
    }
}


// weather icons choice
import weatherIcons from '~/datas/weather-icons.json'
import weatherNightIcons from '~/datas/weather-night-icons.json'
export const weatherIconChoice = (hourData: Object) => {
    if (hourData.datetime < useSunTimes().value.sunrise || hourData.datetime > useSunTimes().value.sunset) {
        return weatherNightIcons.find((icon: Object) => icon.value === hourData.icon)
    } else {
        return weatherIcons.find((icon: Object) => icon.value === hourData.icon)
    }
}


export const useIndexDayChoiced = () => useState < Number > ('indexDayChoiced', () => (0));

export const calcMoonPercent = (moonphase: Number) => {
    let result = null
    if (moonphase === 0 || moonphase === 1) {
        result = 0;
        return result;
    } else if (moonphase === 0.5) {
        result = 100;
        return result;
    } else if (moonphase < 0.5) {
        result = moonphase * 100 * 2;
        console.log(0.49 * 100 * 2)
        return result;
    } else if (moonphase > 0.5) {
        result = moonphase * 100 * 2;
        return 200 - result;
    }
}

export const useChoicedHistoryLocation = () => useState < Number > ('choicedHistoryLocation', () => (null));
