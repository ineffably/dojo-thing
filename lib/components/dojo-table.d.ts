import { Award } from '../types/dojo-types';
import { LookupFilters } from '../types/app-types';
interface DojoTableProps {
    awardsData: Award[];
    lookupFilters: LookupFilters;
}
export declare const DojoTable: ({ awardsData, lookupFilters }: DojoTableProps) => import("react/jsx-runtime").JSX.Element;
export {};
