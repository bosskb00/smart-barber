const averageTimeTakenInMins = 60;
const openingTime = "09:00";
const closingTime = "18:00";

export const utils = {
  timeToMilliseconds(time) {
    const [hours, mins] = time.split(":");
    const updateHours = new Date().setHours(hours);
    const updateMinsAndHours = new Date(updateHours).setMinutes(mins);
    return updateMinsAndHours;
  },

  getAndFormatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  },

  getAndFormatTime(hours, mins) {
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  },
};

function getReservedTimeSlots(bookedDates, date) {
  const reservedSlots = bookedDates[date] ? bookedDates[date] : [];

  return reservedSlots.map((slot) =>
    utils.getAndFormatTime(
      new Date(slot).getHours(),
      new Date(slot).getMinutes()
    )
  );
}

function getTotalTimeSlots() {
  const totalTimeSlots = [];
  let _openingTime = utils.timeToMilliseconds(openingTime);
  let _closingTime = utils.timeToMilliseconds(closingTime);

  if (_openingTime >= _closingTime)
    throw new Error("Opening time cannot be greater than closing time");

  for (
    let i = _openingTime;
    i < _closingTime;
    i = new Date(i + averageTimeTakenInMins * 60000).getTime()
  ) {
    totalTimeSlots.push(
      utils.getAndFormatTime(new Date(i).getHours(), new Date(i).getMinutes())
    );
  }

  return totalTimeSlots;
}

export function fetchAvailableSlots(date, bookedDates) {
  const totalTimeSlots = getTotalTimeSlots();
  const reservedTimeSlots = getReservedTimeSlots(bookedDates, date);

  return totalTimeSlots.map((slot) => {
    if (reservedTimeSlots.includes(slot)) return { available: false, slot };
    return { available: true, slot };
  });
}