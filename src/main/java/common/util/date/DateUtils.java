package common.util.date;


import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


public class DateUtils extends org.apache.commons.lang3.time.DateUtils {
    public static final String TIME_WITH_MINUTE_PATTERN = "HH:mm";
    public static final long DAY_MILLI = 86400000L;
    public static final int LEFT_OPEN_RIGHT_OPEN = 1;
    public static final int LEFT_CLOSE_RIGHT_OPEN = 2;
    public static final int LEFT_OPEN_RIGHT_CLOSE = 3;
    public static final int LEFT_CLOSE_RIGHT_CLOSE = 4;
    public static final int COMP_MODEL_DATE = 1;
    public static final int COMP_MODEL_TIME = 2;
    public static final int COMP_MODEL_DATETIME = 3;
    private static final Logger logger = LogManager.getLogger(DateUtils.class);

    public static String DATE_FORMAT_DATEONLY = "yyyy-MM-dd";
    public static String DATE_FORMAT_DATETIME = "yyyy-MM-dd HH:mm:ss";
    public static SimpleDateFormat sdfDateTime = new SimpleDateFormat(DATE_FORMAT_DATETIME);
    public static SimpleDateFormat sdfDateOnly = new SimpleDateFormat(DATE_FORMAT_DATEONLY);
    public static final SimpleDateFormat formatTimestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static final SimpleDateFormat SHORTDATEFORMAT = new SimpleDateFormat("yyyyMMdd");
    public static final SimpleDateFormat SHORT_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    public static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static final SimpleDateFormat LONG_DATE_FORMAT_SSS = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
    public static final SimpleDateFormat HMS_FORMAT = new SimpleDateFormat("HH:mm:ss");
    private static final String TIME_FORMAT_SHORT_SSS = "yyyyMMddHHmmssS";
    public static Date parseDate(String str, String parsePatterns)
            throws ParseException {
        return parseDate(str, new String[]{parsePatterns});
    }

    public static int compareDate(Date date, Date otherDate, int withUnit) {
        Calendar dateCal = Calendar.getInstance();
        dateCal.setTime(date);
        Calendar otherDateCal = Calendar.getInstance();
        otherDateCal.setTime(otherDate);

        switch (withUnit) {
            case 1:
                dateCal.clear(2);
                otherDateCal.clear(2);
            case 2:
                dateCal.set(5, 1);
                otherDateCal.set(5, 1);
            case 5:
                dateCal.set(11, 0);
                otherDateCal.set(11, 0);
            case 10:
                dateCal.clear(12);
                otherDateCal.clear(12);
            case 12:
                dateCal.clear(13);
                otherDateCal.clear(13);
            case 13:
                dateCal.clear(14);
                otherDateCal.clear(14);
            case 14:
                break;
            case 3:
            case 4:
            case 6:
            case 7:
            case 8:
            case 9:
            case 11:
            default:
                throw new IllegalArgumentException("withUnit 单位字段 " + withUnit + " 不合法！！");
        }
        return dateCal.compareTo(otherDateCal);
    }

    public static String getTimeNormalStringSSS(Date date){
        DateFormat fmt = new SimpleDateFormat(TIME_FORMAT_SHORT_SSS);
        return fmt.format(date);
    }

    public static int compareTime(Date date, Date otherDate, int withUnit) {
        Calendar dateCal = Calendar.getInstance();
        dateCal.setTime(date);
        Calendar otherDateCal = Calendar.getInstance();
        otherDateCal.setTime(otherDate);

        dateCal.clear(1);
        dateCal.clear(2);
        dateCal.set(5, 1);
        otherDateCal.clear(1);
        otherDateCal.clear(2);
        otherDateCal.set(5, 1);
        switch (withUnit) {
            case 10:
                dateCal.clear(12);
                otherDateCal.clear(12);
            case 12:
                dateCal.clear(13);
                otherDateCal.clear(13);
            case 13:
                dateCal.clear(14);
                otherDateCal.clear(14);
            case 14:
                break;
            case 11:
            default:
                throw new IllegalArgumentException("withUnit 单位字段 " + withUnit + " 不合法！！");
        }
        return dateCal.compareTo(otherDateCal);
    }

    public static long nowTimeMillis() {
        return System.currentTimeMillis();
    }

    public static Timestamp nowTimeStamp() {
        return new Timestamp(nowTimeMillis());
    }

    public static String getReqDate() {
        return SHORTDATEFORMAT.format(new Date());
    }

    public static String getReqDate(Date date) {
        return SHORT_DATE_FORMAT.format(date);
    }

    public static String getReqDateyyyyMMdd(Date date) {
        return SHORTDATEFORMAT.format(date);
    }

    public static String TimestampToDateStr(Timestamp tmp) {
        return SHORT_DATE_FORMAT.format(tmp);
    }

    public static String getReqTime() {
        return HMS_FORMAT.format(new Date());
    }

    public static String getTimeStampStr(Date date) {
        return LONG_DATE_FORMAT.format(date);
    }

    public static String getLongDateStr() {
        return LONG_DATE_FORMAT.format(new Date());
    }

    public static String getLongDateStr(Timestamp time) {
        return LONG_DATE_FORMAT.format(time);
    }

    public static String getShortDateStr(Date date) {
        return SHORT_DATE_FORMAT.format(date);
    }

    public static String getShortDateStr() {
        return SHORT_DATE_FORMAT.format(new Date());
    }

    public static Date addSecond(Date date, int second) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        calendar.add(13, second);
        return calendar.getTime();
    }

    public static Date addMinute(Date date, int minute) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(12, minute);
        return calendar.getTime();
    }

    public static Date addHour(Date date, int hour) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(10, hour);
        return calendar.getTime();
    }

    public static Date getDayStart(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static Date getDayEnd(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        calendar.add(5, 1);
        calendar.add(14, -1);
        return calendar.getTime();
    }

    public static Date addDay(Date date, int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(5, day);
        return calendar.getTime();
    }

    public static Date getMonthEnd(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(5, 1);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        calendar.add(2, 1);
        calendar.add(14, -1);
        return calendar.getTime();
    }

    public static Date addYear(Date date, int year) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(6, 365 * year);
        return calendar.getTime();
    }

    public static Timestamp strToTimestamp(String dateStr) {
        return Timestamp.valueOf(dateStr);
    }

    public static Timestamp strToTimestamp(Date date) {
        return Timestamp.valueOf(formatTimestamp.format(date));
    }

    public static Timestamp getCurTimestamp() {
        return Timestamp.valueOf(formatTimestamp.format(new Date()));
    }

    public static long daysBetween(Timestamp t1, Timestamp t2) {
        return ((t2.getTime() - t1.getTime()) / 86400000L);
    }

    public static Timestamp getSysDateTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }

    public static Timestamp toSqlTimestamp(String sDate) {
        if (sDate == null) {
            return null;
        }
        if ((sDate.length() != DATE_FORMAT_DATEONLY.length()) &&
                (sDate
                        .length() != DATE_FORMAT_DATETIME.length())) {
            return null;
        }
        return toSqlTimestamp(sDate,
                (sDate
                        .length() == DATE_FORMAT_DATEONLY.length()) ? DATE_FORMAT_DATEONLY : DATE_FORMAT_DATETIME);
    }

    public static Timestamp toSqlTimestamp(String sDate, String sFmt) {
        String temp = null;
        if ((sDate == null) || (sFmt == null)) {
            return null;
        }
        if (sDate.length() != sFmt.length()) {
            return null;
        }
        if (sFmt.equals(DATE_FORMAT_DATETIME)) {
            temp = sDate.replace('/', '-');
            temp = temp + ".000000000";
        } else if (sFmt.equals(DATE_FORMAT_DATEONLY)) {
            temp = sDate.replace('/', '-');
            temp = temp + " 00:00:00.000000000";
        } else {
            return null;
        }
        return Timestamp.valueOf(temp);
    }

    public static String getSysDateTimeString() {
        return toString(new Date(System.currentTimeMillis()), sdfDateTime);
    }

    public static String toString(Date dt, String sFmt) {
        if ((dt == null) || (sFmt == null) || ("".equals(sFmt))) {
            return "";
        }
        return toString(dt, new SimpleDateFormat(sFmt));
    }

    private static String toString(Date dt, SimpleDateFormat formatter) {
        String sRet = null;
        try {
            sRet = formatter.format(dt).toString();
        } catch (Exception e) {
            logger.error(e);
            sRet = null;
        }

        return sRet;
    }

    public static String toSqlTimestampString2(Timestamp dt) {
        if (dt == null) {
            return null;
        }
        String temp = toSqlTimestampString(dt, DATE_FORMAT_DATETIME);
        return temp.substring(0, 16);
    }

    public static String toString(Timestamp dt) {
        return ((dt == null) ? "" : toSqlTimestampString2(dt));
    }

    public static String toSqlTimestampString(Timestamp dt, String sFmt) {
        String temp = null;
        String out = null;
        if ((dt == null) || (sFmt == null)) {
            return null;
        }
        temp = dt.toString();
        if ((sFmt.equals(DATE_FORMAT_DATETIME)) ||
                (sFmt
                        .equals(DATE_FORMAT_DATEONLY))) {
            temp = temp.substring(0, sFmt.length());
            out = temp.replace('/', '-');
        }

        return out;
    }

    public static int getWeek() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        int w = cal.get(7);
        return w;
    }

    public static String timestampToStringYMD(Timestamp timestamp) {
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_DATEONLY);
        String createTimeStr = sdf.format(timestamp);
        return createTimeStr;
    }

    public static boolean isBetween(Date now, Date start, Date end, int model) {
        return isBetween(now, start, end, model, 1);
    }

    public static boolean isBetween(Date date, Date start, Date end, int interModel, int compModel) {
        if ((date == null) || (start == null) || (end == null)) {
            throw new IllegalArgumentException("日期不能为空");
        }
        SimpleDateFormat format = null;
        switch (compModel) {
            case 1:
                format = new SimpleDateFormat("yyyyMMdd");
                break;
            case 2:
                format = new SimpleDateFormat("HHmmss");
                break;
            case 3:
                format = new SimpleDateFormat("yyyyMMddHHmmss");
                break;
            default:
                throw new IllegalArgumentException(String.format("日期的比较模式[%d]有误", new Object[]{Integer.valueOf(compModel)}));
        }

        long dateNumber = Long.parseLong(format.format(date));
        long startNumber = Long.parseLong(format.format(start));
        long endNumber = Long.parseLong(format.format(end));
        switch (interModel) {
            case 1:
                return ((dateNumber > startNumber) && (dateNumber < endNumber));
            case 2:
                return ((dateNumber >= startNumber) && (dateNumber < endNumber));
            case 3:
                return ((dateNumber > startNumber) && (dateNumber <= endNumber));
            case 4:
                return ((dateNumber >= startNumber) && (dateNumber <= endNumber));
        }

        throw new IllegalArgumentException(String.format("日期的区间模式[%d]有误", new Object[]{Integer.valueOf(interModel)}));
    }

    public static Date getWeekStart(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.get(3);
        int firstDay = calendar.getFirstDayOfWeek();
        calendar.set(7, firstDay);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static Date getWeekEnd(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.get(3);
        int firstDay = calendar.getFirstDayOfWeek();
        calendar.set(7, 8 - firstDay);
        calendar.set(11, 23);
        calendar.set(12, 59);
        calendar.set(13, 59);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static Date getMonthStart(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(5, 1);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static Date getYearStart(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(1, calendar.get(1));
        calendar.set(2, 0);
        calendar.set(5, 1);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static Date getYearEnd(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(1, calendar.get(1));
        calendar.set(2, 11);
        calendar.set(5, 31);
        calendar.set(11, 23);
        calendar.set(12, 59);
        calendar.set(13, 59);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static int getDayOfMonth(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.getActualMaximum(5);
    }

    public static Date getFirstDateOfMonth(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set(5, c.getActualMinimum(5));
        return c.getTime();
    }

    public static Date getLastDateOfMonth(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set(5, c.getActualMaximum(5));
        return c.getTime();
    }

    public static Date getSeasonStart(Date date) {
        return getDayStart(getFirstDateOfMonth(getSeasonDate(date)[0]));
    }

    public static Date getSeasonEnd(Date date) {
        return getDayEnd(getLastDateOfMonth(getSeasonDate(date)[2]));
    }

    public static Date[] getSeasonDate(Date date) {
        Date[] season = new Date[3];

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        int nSeason = getSeason(date);
        if (nSeason == 1) {
            c.set(2, 0);
            season[0] = c.getTime();
            c.set(2, 1);
            season[1] = c.getTime();
            c.set(2, 2);
            season[2] = c.getTime();
        } else if (nSeason == 2) {
            c.set(2, 3);
            season[0] = c.getTime();
            c.set(2, 4);
            season[1] = c.getTime();
            c.set(2, 5);
            season[2] = c.getTime();
        } else if (nSeason == 3) {
            c.set(2, 6);
            season[0] = c.getTime();
            c.set(2, 7);
            season[1] = c.getTime();
            c.set(2, 8);
            season[2] = c.getTime();
        } else if (nSeason == 4) {
            c.set(2, 9);
            season[0] = c.getTime();
            c.set(2, 10);
            season[1] = c.getTime();
            c.set(2, 11);
            season[2] = c.getTime();
        }
        return season;
    }

    public static int getSeason(Date date) {
        int season = 0;

        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int month = c.get(2);
        switch (month) {
            case 0:
            case 1:
            case 2:
                season = 1;
                break;
            case 3:
            case 4:
            case 5:
                season = 2;
                break;
            case 6:
            case 7:
            case 8:
                season = 3;
                break;
            case 9:
            case 10:
            case 11:
                season = 4;
        }

        return season;
    }

    public static int getWeekOfYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(2);
        calendar.setTime(date);
        return calendar.get(3);
    }

    public static int getMonthOfYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(2);
        calendar.setTime(date);
        return calendar.get(4);
    }

    public static Date StringToDate(String dateString) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        Date date = null;
        try {
            date = sdf.parse(dateString);
        } catch (ParseException e) {
            logger.error("StringToDate ParseException ", e);
        }
        return date;
    }

    public static int getWeekIndex(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(7);
    }

    public static Date subDays(int days) {
        Date date = addDay(new Date(), -days);
        String dateStr = getReqDate(date);
        Date date1 = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            date1 = sdf.parse(dateStr);
        } catch (ParseException e) {
            logger.error(e);
        }
        return date1;
    }

    public static boolean isOverIntervalLimit(Date startDate, Date endDate, int interval, int dateUnit) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(dateUnit, interval * -1);
        Date curDate = getDayStart(cal.getTime());

        return ((getDayStart(startDate).compareTo(curDate) < 0) || (getDayStart(endDate).compareTo(curDate) < 0));
    }

    public static boolean isOverIntervalLimit(Date startDate, Date endDate, int interval) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(5, interval * -1);
        Date curDate = getDayStart(cal.getTime());

        return ((getDayStart(startDate).compareTo(curDate) < 0) || (getDayStart(endDate).compareTo(curDate) < 0));
    }

    public static boolean isOverIntervalLimit(String startDateStr, String endDateStr, int interval) {
        Date startDate = null;
        Date endDate = null;
        try {
            startDate = parseDate(startDateStr, DATE_FORMAT_DATEONLY);
            endDate = parseDate(endDateStr, DATE_FORMAT_DATEONLY);
        } catch (ParseException e) {
            logger.error("ParseException", e);
            return false;
        }
        return isOverIntervalLimit(startDate, endDate, interval);
    }

    public static Date getDateFromString(String src, String pattern) {
        SimpleDateFormat f = new SimpleDateFormat(pattern);
        try {
            return f.parse(src);
        } catch (ParseException e) {
        }
        return null;
    }

    public static int getQuarter(Date date) {
        if ((date.getMonth() == 0) || (date.getMonth() == 1) || (date.getMonth() == 2))
            return 1;
        if ((date.getMonth() == 3) || (date.getMonth() == 4) || (date.getMonth() == 5))
            return 2;
        if ((date.getMonth() == 6) || (date.getMonth() == 7) || (date.getMonth() == 8))
            return 3;
        if ((date.getMonth() == 9) || (date.getMonth() == 10) || (date.getMonth() == 11)) {
            return 4;
        }
        return 0;
    }

    public static String formatDate(Date date) {
        if (date == null) {
            return "";
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(date);
    }

    public static String today() {
        return formatDate(new Date(), "yyyy-MM-dd");
    }

    public static String currentTime() {
        return formatDate(new Date(), "yyyyMMddhhmmssSSS");
    }

    public static String formatDate(Date date, String format) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    public static String getYesterday() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(5, -1);
        return formatDate(calendar.getTime(), "yyyy-MM-dd");
    }

    public static boolean isInBetweenTimes(String startTime, String endTime) {
        Date nowTime = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        String time = sdf.format(nowTime);

        return ((time.compareTo(startTime) >= 0) && (time.compareTo(endTime) <= 0));
    }

    public static Date getDateByStr(String dateStr) {
        SimpleDateFormat formatter = null;
        if (dateStr == null)
            return null;
        if (dateStr.length() == 10) {
            formatter = new SimpleDateFormat("yyyy-MM-dd");
        } else if (dateStr.length() == 16) {
            formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        } else if (dateStr.length() == 19) {
            formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        } else if (dateStr.length() > 19) {
            dateStr = dateStr.substring(0, 19);
            formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        } else {
            return null;
        }
        try {
            return formatter.parse(dateStr);
        } catch (ParseException e) {
            logger.error(e);
        }
        return null;
    }

    public static Date getDate(int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(5, days);
        return calendar.getTime();
    }

    public static Date getMaxTime(Date dt) {
        Date dt1 = null;
        Calendar ca = Calendar.getInstance();
        ca.setTime(dt);
        ca.add(5, 1);
        dt1 = ca.getTime();
        dt1 = getMinTime(dt1);
        ca.setTime(dt1);
        ca.add(13, -1);
        dt1 = ca.getTime();
        return dt1;
    }

    public static Date getMinTime(Date dt) {
        Date dt1 = null;
        dt1 = getDateByStr(formatDate(dt, "yyyy-MM-dd"));
        return dt1;
    }

    public static Date getLastDayOfMonth(Date date) {
        Calendar cDay1 = Calendar.getInstance();
        cDay1.setTime(date);
        int lastDay = cDay1.getActualMaximum(5);
        Date lastDate = cDay1.getTime();
        lastDate.setDate(lastDay);
        return lastDate;
    }

    public static Date getFirstDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(5, calendar.getActualMinimum(5));
        return calendar.getTime();
    }

    public static Date getPreviousMonthFirstDay() {
        Calendar lastDate = Calendar.getInstance();
        lastDate.set(5, 1);
        lastDate.add(2, -1);
        return getMinTime(lastDate.getTime());
    }

    public static Date getPreviousMonthLastDay() {
        Calendar lastDate = Calendar.getInstance();
        lastDate.set(5, 1);
        lastDate.add(5, -1);
        return getMinTime(lastDate.getTime());
    }

    public static long getDateDiff(String startDate, String endDate) {
        long diff = 0L;
        try {
            Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(startDate);
            Date date2 = new SimpleDateFormat("yyyy-MM-dd").parse(endDate);

            diff = ((date1.getTime() - date2.getTime()) / 86400000L > 0L) ? (date1.getTime() - date2.getTime()) / 86400000L :
                    (date2
                            .getTime() - date1.getTime()) / 86400000L;
        } catch (ParseException localParseException) {
        }
        return diff;
    }

    public static long getDateDiff(Date date1, Date date2) {
        if ((date1 == null) || (date2 == null)) {
            return 0L;
        }

        long diff = ((date1.getTime() - date2.getTime()) / 86400000L > 0L) ?
                (date1.getTime() - date2
                        .getTime()) / 86400000L : (date2.getTime() - date1.getTime()) / 86400000L;
        return diff;
    }

    public static boolean isSameWeekWithToday(Date date) {
        if (date == null) {
            return false;
        }

        Calendar todayCal = Calendar.getInstance();
        Calendar dateCal = Calendar.getInstance();

        todayCal.setTime(new Date());
        dateCal.setTime(date);
        int subYear = todayCal.get(1) - dateCal.get(1);

        if (subYear == 0)
            if (todayCal.get(3) == dateCal.get(3))
                return true;
            else if ((subYear == 1) && (dateCal.get(2) == 11) && (todayCal.get(2) == 0))
                if (todayCal.get(3) == dateCal.get(3))
                    return true;
                else if ((subYear == -1) && (todayCal.get(2) == 11) && (dateCal.get(2) == 0) &&
                        (todayCal.get(3) == dateCal.get(3))) {
                    return true;
                }
        return false;
    }

    public static String getStrFormTime(String form, Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(form);
        return sdf.format(date);
    }

    public static List<String> getLastDays(int countDay) {
        List listDate = new ArrayList();
        for (int i = 0; i < countDay; ++i) {
            listDate.add(getReqDateyyyyMMdd(getDate(-i)));
        }
        return listDate;
    }

    public static Date dateFormat(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date value = new Date();
        try {
            value = sdf.parse(sdf.format(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return value;
    }

    /**
     * 根据年月日计算年龄
     * @Author xiangzebing
     */
    public static int getAge(Date birthDay) throws Exception {
        Calendar cal = Calendar.getInstance();
        if (cal.before(birthDay)) {
            throw new IllegalArgumentException(
                    "The birthDay is before Now.It's unbelievable!");
        }
        int yearNow = cal.get(Calendar.YEAR);
        int monthNow = cal.get(Calendar.MONTH);
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);
        cal.setTime(birthDay);

        int yearBirth = cal.get(Calendar.YEAR);
        int monthBirth = cal.get(Calendar.MONTH);
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);

        int age = yearNow - yearBirth;

        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                if (dayOfMonthNow < dayOfMonthBirth) age--;
            }else{
                age--;
            }
        }
        return age;
    }
}