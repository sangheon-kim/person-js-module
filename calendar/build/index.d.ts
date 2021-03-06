/**
 * @description 달력 리턴 관련
 * @author Sangheon Kim  (ksj8367@gmail.com)
 * @createdBy 20200816
 */
declare const calendar: {
    isMonthSlice: boolean;
    lang: string;
    setMonthSlice: (bool: boolean) => void;
    setLang: (lang?: string) => void;
    get_year: (src: number) => number;
    Resut: (lunaDate: any) => string;
    today: Date;
    weekArray: {
        dayCode: number;
        ko: string;
        en: string;
    }[];
    monthArray: {
        monthCode: number;
        ko: string;
        en: string;
    }[];
    setToday: (year: number, month: number) => void;
    getToday: () => {};
    getPrevCalendar: () => {};
    getNextCalendar: () => {};
    buildCalendar: () => {};
};
export default calendar;
