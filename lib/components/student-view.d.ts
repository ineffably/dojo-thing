import { Award } from '../types/dojo-types';
export interface StudentCardProps {
    studentHistory: Award[];
    studentBehaviors: Record<string, any>;
}
export declare const StudentView: ({ student }: {
    student: any;
}) => import("react/jsx-runtime").JSX.Element;
