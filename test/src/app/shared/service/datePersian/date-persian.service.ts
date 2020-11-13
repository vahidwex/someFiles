import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatePersianService {

  constructor() { }

  convert(date: string) {
    let result = "";
    let gregorianDate = date.split('T')[0];
    let parts = gregorianDate.split('-');
    if(parts.length == 3) {
      result = this.gregorianToPersian(parts[0], parts[1], parts[2]).join('/');
    }
    return result;
  }

  public monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

  div(a, b) {
    return parseInt((a / b).toString());
  }

  private gregorianToPersian(g_y, g_m, g_d) {
    var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    var jalali = [];
    var gy = g_y - 1600;
    var gm = g_m - 1;
    var gd = g_d - 1;

    var g_day_no = 365 * gy + this.div(gy + 3, 4) - this.div(gy + 99, 100) + this.div(gy + 399, 400);

    for (var i = 0; i < gm; ++i)
      g_day_no += g_days_in_month[i];
    if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
      /* leap and after Feb */
      g_day_no++;
    g_day_no += gd;

    var j_day_no = g_day_no - 79;

    var j_np = this.div(j_day_no, 12053);
    /* 12053 = 365*33 + 32/4 */
    j_day_no = j_day_no % 12053;

    var jy = 979 + 33 * j_np + 4 * this.div(j_day_no, 1461);
    /* 1461 = 365*4 + 4/4 */

    j_day_no %= 1461;

    if (j_day_no >= 366) {
      jy += this.div(j_day_no - 1, 365);
      j_day_no = (j_day_no - 1) % 365;
    }
    for (var i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i)
      j_day_no -= j_days_in_month[i];
    var jm = i + 1;
    var jd = j_day_no + 1;
    jalali[0] = jy;
    jalali[1] = jm;
    jalali[2] = jd;
    return jalali;
    //return jalali[0] + "_" + jalali[1] + "_" + jalali[2];
    //return jy + "/" + jm + "/" + jd;
  }

  private get_year_month_day(date) {
    var convertDate;
    var y = date.substr(0, 4);
    var m = date.substr(5, 2);
    var d = date.substr(8, 2);
    convertDate = this.gregorianToPersian(y, m, d);
    return convertDate;
  }

  private get_hour_minute_second(time) {
    var convertTime = [];
    convertTime[0] = time.substr(0, 2);
    convertTime[1] = time.substr(3, 2);
    convertTime[2] = time.substr(6, 2);
    return convertTime;
  }

  private convertDate(date) {
    var convertDateTime = this.get_year_month_day(date.substr(0, 10));
    convertDateTime = convertDateTime[0] + "/" + convertDateTime[1] + "/" + convertDateTime[2] + " " + date.substr(10);
    return convertDateTime;
  }
  
  private get_persian_month(month) {
    let result = "";
    switch (month) {
      case 1: {
        result = this.monthNames[0];
        break;
      }
      case 2: {
        result = this.monthNames[1];
        break;
      }
      case 3: {
        result = this.monthNames[2];
        break;
      }
      case 4: {
        result = this.monthNames[3];
        break;
      }
      case 5: {
        result = this.monthNames[4];
        break;
      }
      case 6: {
        result = this.monthNames[5];
        break;
      }
      case 7: {
        result = this.monthNames[6];
        break;
      }
      case 8: {
        result = this.monthNames[7];
        break;
      }
      case 9: {
        result = this.monthNames[8];
        break;
      }
      case 10: {
        result = this.monthNames[9];
        break;
      }
      case 11: {
        result = this.monthNames[10];
        break;
      }
      case 12: {
        result = this.monthNames[11];
        break;
      }
    }
  }
}
