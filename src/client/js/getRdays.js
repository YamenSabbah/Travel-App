const getRdays = (date) => {
    const currentDate = new Date();
    const endDate = new Date(date);
    const differenceInTime = endDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return remainingDays;
};

module.exports = {
    getRdays,
};
