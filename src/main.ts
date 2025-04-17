import './style.css'

interface CourseInfo {
  code: string;
  name: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}

function getCourses(): CourseInfo[] {
  const data = localStorage.getItem("courses");
  return data ? JSON.parse(data) : [];
}

function saveCourses(courses: CourseInfo[]): void {
  localStorage.setItem("courses", JSON.stringify(courses));
}

function removeCourse(code: string): void {
  let courses = getCourses();
  courses = courses.filter(course => course.code !== code); 
  saveCourses(courses);
  renderCourses(); 
}

function addCourse(course: CourseInfo): void {
  const courses = getCourses();

  const isDuplicate = courses.some(c => c.code === course.code);
  if (isDuplicate) {
    alert("Kurskoden måste vara unik.");
    return;
  }

  courses.push(course);
  saveCourses(courses);
  renderCourses();
}

function renderCourses(): void {
  const courseList = document.getElementById("course-list") as HTMLUListElement;
  courseList.innerHTML = ""; 

  const courses = getCourses();
  courses.forEach(course => {
    const li = document.createElement("li");
    
    li.innerHTML = `
      <strong>${course.code}</strong>: ${course.name} (${course.progression})
      ${course.syllabus ? `- <a href="${course.syllabus}" target="_blank">Kursplan</a>` : ''}
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Ta bort";
    deleteBtn.style.marginLeft = "1rem";
    deleteBtn.addEventListener("click", () => removeCourse(course.code));

    li.appendChild(deleteBtn);
    courseList.appendChild(li);

    courseList.appendChild(li);
  });
}




document.getElementById("course-form")!.addEventListener("submit", (e) => {
  e.preventDefault();

  const course: CourseInfo = {
    code: (document.getElementById("code") as HTMLInputElement).value.trim(),
    name: (document.getElementById("name") as HTMLInputElement).value.trim(),
    progression: (document.getElementById("progression") as HTMLSelectElement).value as 'A' | 'B' | 'C',
    syllabus: (document.getElementById("syllabus") as HTMLInputElement).value.trim()
  };

  addCourse(course);

  (document.getElementById("course-form") as HTMLFormElement).reset();
});

renderCourses();
