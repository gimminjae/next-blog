const util = {
  makeSearchParam(param: []) {
    let searchParams = [];
    if (!(param === null || param === undefined)) {
      for (let key in param) {
        searchParams.push(`${key}=${param[key]}`);
      }
    }
    return `${searchParams.length === 0 ? "" : "?"}${searchParams.join("&")}`;
  },
  showBasicError(error: any) {
    return error.response.data || "오류가 발생하였습니다.";
  },
  getFormattedCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  getFormattedDateTime(date: Date): string {
    const now = date;
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  getDateTimeStamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  },
  getCurrentDateTimeStamp(): number {
    return this.getDateTimeStamp(new Date());
  },
  tryCatchFunction(f: any, catchF: any) {
    try {
      return f();
    } catch (error) {
      catchF(error);
    }
  },
};

export default util;
