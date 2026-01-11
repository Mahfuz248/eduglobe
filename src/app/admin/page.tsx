'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, Annoyed } from 'lucide-react';
import { students as defaultStudents } from '@/lib/student-data';
import { translations as defaultTranslations } from '@/lib/translations';

export default function AdminDashboardPage() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [recentActivities, setRecentActivities] = useState<string[]>([]);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    const students = storedStudents ? JSON.parse(storedStudents) : defaultStudents;
    setTotalStudents(students.length);

    const storedTranslations = localStorage.getItem('translations');
    const translations = storedTranslations
      ? JSON.parse(storedTranslations)
      : defaultTranslations;
    setTotalTeachers(translations.en.about.teachers.length);

    // Mock recent activities
    setRecentActivities([
        "New student 'Jane Doe' added.",
        "Results for student ID '12345' updated.",
        "New photo added to the gallery.",
        "Annual Sports Day announcement published."
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-center text-sm">
                <Annoyed className="mr-2 h-4 w-4 text-muted-foreground" />
                {activity}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
