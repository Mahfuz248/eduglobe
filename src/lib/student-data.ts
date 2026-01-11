export type Student = {
  id: string;
  name: string;
  class: string;
  roll: string;
  grades: {
    en: { subject: string; grade: string; marks: number };
    bn: { subject: string; grade: string; marks: number };
  }[];
  attendance: { total: number; present: number };
  behavior: {
    en: string[];
    bn: string[];
  };
};

export const students: Student[] = [
  {
    id: '12345',
    name: 'Rahim Ahmed',
    class: '10th Grade',
    roll: '101',
    grades: [
      {
        en: { subject: 'English', grade: 'A+', marks: 92 },
        bn: { subject: 'ইংরেজি', grade: 'এ+', marks: 92 },
      },
      {
        en: { subject: 'Bangla', grade: 'A', marks: 85 },
        bn: { subject: 'বাংলা', grade: 'এ', marks: 85 },
      },
      {
        en: { subject: 'Mathematics', grade: 'A+', marks: 95 },
        bn: { subject: 'গণিত', grade: 'এ+', marks: 95 },
      },
      {
        en: { subject: 'Science', grade: 'B+', marks: 78 },
        bn: { subject: 'বিজ্ঞান', grade: 'বি+', marks: 78 },
      },
      {
        en: { subject: 'History', grade: 'A-', marks: 81 },
        bn: { subject: 'ইতিহাস', grade: 'এ-', marks: 81 },
      },
    ],
    attendance: { total: 180, present: 175 },
    behavior: {
      en: ['Excellent participation in class discussions.', 'Proactive in team projects.'],
      bn: ['ক্লাসের আলোচনায় চমৎকার অংশগ্রহণ।', 'দলীয় প্রকল্পে সক্রিয়।'],
    },
  },
  {
    id: '67890',
    name: 'Fatima Chowdhury',
    class: '10th Grade',
    roll: '102',
    grades: [
      {
        en: { subject: 'English', grade: 'A', marks: 88 },
        bn: { subject: 'ইংরেজি', grade: 'এ', marks: 88 },
      },
      {
        en: { subject: 'Bangla', grade: 'A+', marks: 94 },
        bn: { subject: 'বাংলা', grade: 'এ+', marks: 94 },
      },
      {
        en: { subject: 'Mathematics', grade: 'B', marks: 75 },
        bn: { subject: 'গণিত', grade: 'বি', marks: 75 },
      },
      {
        en: { subject: 'Science', grade: 'A-', marks: 82 },
        bn: { subject: 'বিজ্ঞান', grade: 'এ-', marks: 82 },
      },
      {
        en: { subject: 'History', grade: 'C+', marks: 68 },
        bn: { subject: 'ইতিহাস', grade: 'সি+', marks: 68 },
      },
    ],
    attendance: { total: 180, present: 168 },
    behavior: {
      en: ['Shows great leadership skills.', 'Needs to improve on submitting assignments on time.'],
      bn: ['চমৎকার নেতৃত্ব দেওয়ার ক্ষমতা দেখিয়েছে।', 'সময়মতো অ্যাসাইনমেন্ট জমা দেওয়ার বিষয়ে উন্নতি প্রয়োজন।'],
    },
  },
  {
    id: '11223',
    name: 'Kamal Hasan',
    class: '9th Grade',
    roll: '901',
    grades: [
      {
        en: { subject: 'English', grade: 'C', marks: 65 },
        bn: { subject: 'ইংরেজি', grade: 'সি', marks: 65 },
      },
      {
        en: { subject: 'Bangla', grade: 'B', marks: 72 },
        bn: { subject: 'বাংলা', grade: 'বি', marks: 72 },
      },
      {
        en: { subject: 'Mathematics', grade: 'D', marks: 55 },
        bn: { subject: 'গণিত', grade: 'ডি', marks: 55 },
      },
      {
        en: { subject: 'Science', grade: 'C+', marks: 68 },
        bn: { subject: 'বিজ্ঞান', grade: 'সি+', marks: 68 },
      },
      {
        en: { subject: 'Social Science', grade: 'B-', marks: 70 },
        bn: { subject: 'সমাজবিজ্ঞান', grade: 'বি-', marks: 70 },
      },
    ],
    attendance: { total: 180, present: 150 },
    behavior: {
      en: ['Can be disruptive in class.', 'Shows potential but needs to focus more.'],
      bn: ['ক্লাসে অমনোযোগী হতে পারে।', 'সম্ভাবনা দেখালেও আরও মনোযোগ প্রয়োজন।'],
    },
  },
];


const getStudents = (): Student[] => {
    if (typeof window !== 'undefined') {
        const fromStorage = localStorage.getItem('students');
        if (fromStorage) {
            return JSON.parse(fromStorage);
        }
    }
    return students;
}

export const getStudentById = (id: string): Student | undefined => {
  return getStudents().find((student) => student.id === id);
};
