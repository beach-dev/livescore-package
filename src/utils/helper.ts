import moment from "moment";

const convert = (n: any) => {
  n = String(n);
  if (n.length === 1) n = "0" + n;
  return n;
};

export const toShortDate = (date: Date) => {
  return (
    date.getUTCDate() +
    "." +
    (parseInt(date.getUTCMonth().toString()) + 1) +
    "." +
    date.getFullYear()
  );
};
export const getStandardTime = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    convert(parseInt(date.getUTCMonth().toString()) + 1) +
    "-" +
    convert(date.getUTCDate())
  );
};

export const getEventTime = (date: Date) => {
  return (
    convert(date.getUTCDate()) +
    "." +
    convert(parseInt(date.getUTCMonth().toString()) + 1) +
    ". " +
    convert(date.getUTCHours()) +
    ":" +
    convert(date.getUTCMinutes())
  );
};

export const getThisYear = () => {
  const now = new Date();
  return now.getFullYear();
};
export const getDates = function (date?: string | undefined) {
  if (!date) date = new Date().toString();
  const tempDate = new Date(date);
  const mome = moment(tempDate);
  return {
    yearfull: mome.format("YYYY"),
    yearshort: mome.format("YY"),
    quarter: mome.format("Q"),
    monthfull: mome.format("MM"),
    monthshort: mome.format("M"),
    monthfullname: mome.format("MMMM"),
    monthshortname: mome.format("MMM"),
    dayfull: mome.format("DD"),
    dayshort: mome.format("D"),
    datenormal: mome.format("MMMM D, YYYY"),
    dateshortname: mome.format("DD MMMM YYYY"),
    dateLong: mome.format("MMM Do YYYY"),
    timeShort: mome.format("HH:mm"),
    datefull: mome.format("DD MMMM YYYY HH:mm"),
    timeandDate: mome.format("D.M. - HH:mm"),
    standard: mome.format("YYYY-MM-DD"),
    isValid: true,
  };
};

export const utc = function (): string {
  return moment.utc().toISOString();
};

export const toUtc = function (date: string): string {
  return moment(date).utc().toISOString();
};
export const to_unix = function () {
  return moment().unix();
};
export const timeDifference = (current: any, previous: any) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;
  if (elapsed < 0) {
    return getDates(elapsed.toString());
  }
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
};

export const parseDate = (date_string: any) => {
  let [y, M, d, h, m, s] = date_string.split(/[- :T]/);

  return new Date(
    y,
    parseInt(M) - 1,
    d,
    h,
    parseInt(m),
    s.replace("Z", "")
  ).valueOf();
};

export const getDateForIOS = (date: any) => {
  let t = date.replace(" ", "T");

  return new Date(t);
};

export const formatDate = (data: any) => {
  let d = (new Date().getTimezoneOffset() / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  let date_var = getDateForIOS(data + `${d}:00`);

  return getEventTime(date_var);
};
