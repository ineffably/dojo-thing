import { DojoAPI } from '../types/dojo-types';
import { DojoData } from '../types/app-types';
export declare const service = "https://teach.classdojo.com/api/interviewChallenge";
export declare const CreateDojoData: ({ awards }: DojoAPI) => Promise<DojoData>;
