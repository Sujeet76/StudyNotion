function convertSecondsToDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

export const getTotalDurationPerSection = (subsection) => {
  let result = 0;
  subsection.forEach(({ timeDuration }) => {
    result += parseInt(timeDuration);
  });
  let ans = convertSecondsToDuration(result);
  return ans;
};

export const getTotalNumberOfLecture = (courseContent) => {
  let lecture = 0;
  courseContent.forEach(({ subSection }) => {
    lecture += subSection.length;
  });
  return lecture;
};
export default convertSecondsToDuration;
