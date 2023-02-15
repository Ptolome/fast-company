export function passedTime(data) {
    const dateNow = new Date().getTime();
    const interval = (dateNow - Number(data)) % 1000;
    let gat = "";
    if (0 < interval && interval < 300) {
        gat = "1 минуту назад";
    };
    if (300 <= interval < 600) {
        gat = "5 минуту назад";
    };
    if (600 <= interval < 1800) {
        gat = "10 минуту назад";
    };
    if (1800 <= interval < 86400) {
        gat = "30 минуту назад";
    };
    if (86400 <= interval < 2678400) {
        gat = `${interval % 60 % 60} час:${interval % 60} минут`;
    };
    if (2678400 <= interval < 32140800) {
        gat = `${interval % 60 % 60} дней ${interval % 60 % 60 % 24} месяц`;
    };
    if (32140800 <= interval) {
        gat = `${interval % 60 % 60} дней ${interval % 60 % 60 % 24} месяц ${interval % 60 % 60 % 24 % 31} год `;
    };
    return gat;
}
