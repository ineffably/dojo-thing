export interface DojoAPI {
  awards?: Award[];
}

export interface Award {
  id?:            string;
  date?:          Date;
  behavior?:      string;
  weight?:        number;
  classroom?:     string;
  student?:       string;
  studentAvatar?: string;
}
