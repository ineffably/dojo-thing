import type { Dispatch } from 'react';
import { Award } from './dojo-types';

export interface AppState {
  isLoaded?: boolean;
  awardsData?: Award[];
  awardsByClassroom?: Record<string, Record<string, any>>;
  awardsByStudents?: Record<string, Award[]>;
  studentBehaviors?: Record<string, any>;
  dojoData?: DojoData;
}

// add more action types here for new application state opperations
export type ActionTypes =
  'SetDojoData' |
  'SetStudentBehaviors' |
  'SetByStudent' |
  'SetAwards' |
  'SetByClassroom' |
  'Loaded';

export interface ReducerActions<T = any> {
  payload: T;
  type: ActionTypes;
}

export interface ProviderState<T = any> {
  state: AppState;
  dispatch?: Dispatch<ReducerActions<T>>;
}

export interface LookupFilters {
  classrooms: Record<string, number>,
  students: Record<string, number>,
  dates: Record<string, number>,
  behaviors: Record<string, number>
}

export interface DojoData {
  awardsByClassroom: any;
  activity: Record<string, any>;
  awardsByStudents: Record<string, Award[]>;
  lookupFilters: LookupFilters;
  weights: Record<string, number>;
  awards: Award[];
  studentBehaviors: Record<string, any>;
}

export interface BehaviorAttributes {
  behaviors: Record<string, any>;
  classrooms: Record<string, number>;
  behaviorPoints: number;
}

export interface BehaviorStats {
  behavior: string;
  count: number;
  reward: number;
}

export interface StudentAwardsEntry {
  awardValue: number;
  avatar: string;
  student?: string;
}

  