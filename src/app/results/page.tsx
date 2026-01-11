'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import type { Student } from '@/lib/student-data';
import { getStudentById } from '@/lib/student-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookUser, CalendarDays, CheckCircle, Smile, XCircle } from 'lucide-react';

export default function ResultsPage() {
  const { language } = useLanguage();
  const t = translations[language].results;

  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStudent(null);

    setTimeout(() => {
      const foundStudent = getStudentById(studentId);
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        setError(t.notFound);
      }
      setLoading(false);
    }, 1000);
  };
  
  const passMarks = 33;
  const isPass = student ? student.grades.every(grade => grade.en.marks >= passMarks) : false;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          {t.title}
        </h1>
      </div>

      <Card className="max-w-md mx-auto shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">{t.enterId}</Label>
              <Input
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g., 12345"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.loading : t.button}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <p className="text-center mt-6 text-destructive font-medium">{error}</p>
      )}

      {student && (
        <Card className="max-w-4xl mx-auto mt-12 shadow-xl animate-in fade-in-50">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-2xl text-primary">{student.name}</CardTitle>
                <div className="flex gap-4 text-muted-foreground mt-2">
                    <span>{t.labels.class}: {student.class}</span>
                    <span>{t.labels.roll}: {student.roll}</span>
                </div>
              </div>
              <Badge variant={isPass ? 'default' : 'destructive'} className={isPass ? 'bg-green-600' : ''}>
                {isPass ? <CheckCircle className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
                {isPass ? t.pass : t.fail}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><BookUser className="h-5 w-5 text-primary" />{t.grades}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.subject}</TableHead>
                  <TableHead className="text-center">{t.grade}</TableHead>
                  <TableHead className="text-right">{t.marks}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.grades.map((gradeInfo, index) => (
                  <TableRow key={index} className={gradeInfo.en.marks < passMarks ? 'bg-destructive/10' : ''}>
                    <TableCell className="font-medium">{gradeInfo[language].subject}</TableCell>
                    <TableCell className="text-center">
                        <Badge variant={gradeInfo.en.marks >= passMarks ? 'secondary' : 'destructive'}>
                            {gradeInfo[language].grade}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">{gradeInfo[language].marks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-6"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary"/>{t.labels.attendance}</h3>
                    <p className="text-muted-foreground">{student.attendance.present} / {student.attendance.total} days</p>
                </div>
                 <div>
                    <h3 className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><Smile className="h-5 w-5 text-primary"/>{t.labels.behavior}</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {student.behavior[language].map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
