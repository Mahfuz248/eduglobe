'use client';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { students as defaultStudents, type Student } from '@/lib/student-data';

export default function ResultsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedStudents = localStorage.getItem('students');
    setStudents(storedStudents ? JSON.parse(storedStudents) : defaultStudents);
  }, []);

  useEffect(() => {
    if(isMounted) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students, isMounted]);


  const handleEdit = (student: Student) => {
    setSelectedStudent(JSON.parse(JSON.stringify(student))); // Deep copy
    setIsEditing(true);
  };

  const handleDelete = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter((s) => s.id !== studentId));
    }
  };

  const handleSave = () => {
    if (!selectedStudent) return;
    
    if (isEditing) {
      setStudents(
        students.map((s) => (s.id === selectedStudent.id ? selectedStudent : s))
      );
    } else {
      // Add new student logic
      const newStudent = { ...selectedStudent, id: Date.now().toString() };
      setStudents([...students, newStudent]);
    }
    
    closeDialog();
  };

  const openAddDialog = () => {
    setSelectedStudent({
        id: '',
        name: '',
        class: '',
        roll: '',
        grades: [
            { en: { subject: 'English', grade: '', marks: 0 }, bn: { subject: 'ইংরেজি', grade: '', marks: 0 } },
            { en: { subject: 'Bangla', grade: '', marks: 0 }, bn: { subject: 'বাংলা', grade: '', marks: 0 } },
            { en: { subject: 'Mathematics', grade: '', marks: 0 }, bn: { subject: 'গণিত', grade: '', marks: 0 } },
        ],
        attendance: { total: 180, present: 0 },
        behavior: { en: [], bn: [] }
    });
    setIsEditing(false);
  };

  const closeDialog = () => {
    setSelectedStudent(null);
  };
  
  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Results</h1>
        <Dialog onOpenChange={(open) => !open && closeDialog()}>
            <DialogTrigger asChild>
                <Button onClick={openAddDialog}>Add Student</Button>
            </DialogTrigger>
            {selectedStudent && (
                 <DialogContent className="sm:max-w-[625px]">
                 <DialogHeader>
                   <DialogTitle>{isEditing ? 'Edit Student' : 'Add Student'}</DialogTitle>
                 </DialogHeader>
                 <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-right">Name</Label>
                     <Input id="name" value={selectedStudent.name} onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })} className="col-span-3" />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="id" className="text-right">Student ID</Label>
                     <Input id="id" value={selectedStudent.id} onChange={(e) => setSelectedStudent({ ...selectedStudent, id: e.target.value })} className="col-span-3" disabled={isEditing}/>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="class" className="text-right">Class</Label>
                     <Input id="class" value={selectedStudent.class} onChange={(e) => setSelectedStudent({ ...selectedStudent, class: e.target.value })} className="col-span-3" />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="roll" className="text-right">Roll</Label>
                     <Input id="roll" value={selectedStudent.roll} onChange={(e) => setSelectedStudent({ ...selectedStudent, roll: e.target.value })} className="col-span-3" />
                   </div>
                   <h3 className="text-lg font-semibold mt-4 col-span-4">Grades</h3>
                   {selectedStudent.grades.map((grade, index) => (
                     <div key={index} className="grid grid-cols-4 items-center gap-4 col-span-4">
                        <Label htmlFor={`subject-${index}`} className="text-right">{grade.en.subject}</Label>
                        <Input 
                            id={`marks-${index}`} 
                            type="number"
                            placeholder="Marks"
                            value={grade.en.marks} 
                            onChange={(e) => {
                                const newGrades = [...selectedStudent.grades];
                                const marks = parseInt(e.target.value) || 0;
                                newGrades[index].en.marks = marks;
                                newGrades[index].bn.marks = marks;
                                setSelectedStudent({ ...selectedStudent, grades: newGrades });
                            }}
                            className="col-span-1" 
                        />
                        <Input 
                            id={`grade-en-${index}`} 
                            placeholder="Grade (EN)"
                            value={grade.en.grade} 
                            onChange={(e) => {
                                const newGrades = [...selectedStudent.grades];
                                newGrades[index].en.grade = e.target.value;
                                setSelectedStudent({ ...selectedStudent, grades: newGrades });
                            }}
                            className="col-span-1" 
                        />
                         <Input 
                            id={`grade-bn-${index}`} 
                            placeholder="Grade (BN)"
                            value={grade.bn.grade} 
                            onChange={(e) => {
                                const newGrades = [...selectedStudent.grades];
                                newGrades[index].bn.grade = e.target.value;
                                setSelectedStudent({ ...selectedStudent, grades: newGrades });
                            }}
                            className="col-span-1" 
                        />
                     </div>
                   ))}
                 </div>
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                   <Button onClick={handleSave}>Save</Button>
                 </DialogFooter>
               </DialogContent>
            )}
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Roll</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.roll}</TableCell>
                <TableCell className="text-right">
                    <Dialog onOpenChange={(open) => !open && closeDialog()}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(student)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(student.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
