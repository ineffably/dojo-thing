import dayjs from 'dayjs';
import { DojoAPI } from '../types/dojo-types';
import { DojoData, BehaviorStats, BehaviorAttributes, StudentAwardsEntry } from '../types/app-types';

export const service = 'https://teach.classdojo.com/api/interviewChallenge';

export const CreateDojoData = async ({ awards }: DojoAPI): Promise<DojoData> => {

  const activity = {
    minDate: '',
    maxDate: '',
    values: [],
    dayCounts: {} as Record<string, number>,
    marks: {} as Record<number, string>
  }

  const updateDayCounts = (yearMonthDay: string) => {
    if (activity.minDate === '') activity.minDate = yearMonthDay;
    if (yearMonthDay !== '' && yearMonthDay < activity.minDate) {
      activity.minDate = yearMonthDay;
    }
    if (yearMonthDay > activity.maxDate) activity.maxDate = yearMonthDay;
    if (yearMonthDay === '') return;
    activity.dayCounts[yearMonthDay] = (activity.dayCounts[yearMonthDay] || 0) + 1;
  };

  const results = awards.reduce((acc, award) => {
    const { awardsByStudents, lookupFilters, awardsByClassroom } = acc;
    const awardsDate = dayjs(award.date).format('YYYY-MM-DD');
    updateDayCounts(awardsDate);

    awardsByStudents[award.student] = ((awardsByStudents[award.student] || []).concat(award));

    lookupFilters.classrooms[award.classroom] = (lookupFilters.classrooms[award.classroom] || 0) + 1;
    lookupFilters.students[award.student] = (lookupFilters.students[award.student] || 0) + 1
    lookupFilters.dates[awardsDate] = (lookupFilters.dates[awardsDate] || 0) + 1;
    lookupFilters.behaviors[award.behavior] = (lookupFilters.behaviors[award.behavior] || 0) + 1;

    const classRoomIndex = awardsByClassroom[award.classroom] || { students: {}, meta: { weightValue: 0 } };
    classRoomIndex.students[award.student] = {
      awardValue: (classRoomIndex.students[award.student]?.awardValue || 0) + award.weight,
      avatar: award.studentAvatar,
      student: award.student
    } as StudentAwardsEntry;
    awardsByClassroom[award.classroom] = classRoomIndex;
    awardsByClassroom[award.classroom].weights = (awardsByClassroom[award.classroom].weights || 0) + award.weight;
    return acc;
  }, {
    awardsByStudents: {},
    awardsByClassroom: {},
    weights: {} as Record<string, number>,
    lookupFilters: {
      classrooms: {},
      students: {},
      dates: {},
      behaviors: {}
    },
    awards
  } as DojoData);

  const studentBehaviors = Object.keys(results.awardsByStudents).reduce((acc, student) => {
    acc[student] = results.awardsByStudents[student].reduce((acc, award) => {
      const { behavior, classroom } = award;
      const values = acc.behaviors[behavior] || { behavior: '', count: 0, reward: 0 } as BehaviorStats;
      values.count++;
      values.reward += award.weight;
      values.behavior = behavior;
      acc.behaviors[behavior] = values;
      acc.classrooms[classroom] = (acc.classrooms[classroom] || 0) + 1;
      acc.behaviorPoints += award.weight;
      return acc;
    }, { behaviors: {}, classrooms: {}, behaviorPoints: 0 });
    return acc;
  }, {} as Record<string, BehaviorAttributes>);
  
  return { ...results, activity, studentBehaviors };
}


