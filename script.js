const students = {
  PGDCA: [
    { roll: 'PG001', name: 'Ramesh Verma', marks: 85, result: 'Pass' },
    { roll: 'PG002', name: 'Sonal Jain', marks: 67, result: 'Pass' },
  ],
  ADCA: [
    { roll: 'AD001', name: 'Vikram Mehta', marks: 75, result: 'Pass' },
    { roll: 'AD002', name: 'Sneha Raj', marks: 49, result: 'Pass' },
  ],
  DCA: [
    { roll: 'DC001', name: 'Arun Singh', marks: 59, result: 'Pass' },
    { roll: 'DC002', name: 'Pooja Das', marks: 38, result: 'Fail' },
  ],
  BCA: [
    { roll: 'BC001', name: 'Manoj Rawat', marks: 88, result: 'Pass' },
    { roll: 'BC002', name: 'Divya Sharma', marks: 55, result: 'Pass' },
  ],
  Cutting: [
    { roll: 'CT001', name: 'Neha Singh', marks: 32, result: 'Fail' },
    { roll: 'CT002', name: 'Ravi Sharma', marks: 81, result: 'Pass' },
  ]
};

function showSubCourse() {
  const mainCourse = document.getElementById('mainCourseSelect').value;
  const subCourseContainer = document.getElementById('subCourseContainer');

  if (mainCourse === 'Computer') {
    subCourseContainer.classList.remove('hidden');
  } else {
    subCourseContainer.classList.add('hidden');
  }
}

function checkResult() {
  const mainCourse = document.getElementById('mainCourseSelect').value;
  const subCourse = document.getElementById('subCourseSelect').value;
  const rollInput = document.getElementById('rollInput').value.trim().toUpperCase();
  const container = document.getElementById('resultContainer');
  container.innerHTML = '';

  if (!mainCourse || !rollInput || (mainCourse === 'Computer' && !subCourse)) {
    alert('Please fill all fields correctly!');
    return;
  }

  let studentList;
  let courseName;
  
  if (mainCourse === 'Computer') {
    studentList = students[subCourse];
    courseName = `${mainCourse} - ${subCourse}`;
  } else {
    studentList = students['Cutting'];
    courseName = mainCourse;
  }

  const student = studentList.find(s => s.roll === rollInput);

  if (student) {
    const emoji = student.result === 'Pass' ? '🎉' : '😢';
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <div class="emoji">${emoji}</div>
      <h2>${student.name}</h2>
      <div class="result-details">
        <p><strong>Roll No:</strong> ${student.roll}</p>
        <p><strong>Course:</strong> ${courseName}</p>
        <p><strong>Marks:</strong> ${student.marks}/100</p>
        <p><strong>Status:</strong> <span class="${student.result.toLowerCase()}">${student.result}</span></p>
      </div>
      <button class="download-btn" onclick="downloadPDF('${student.name}','${student.roll}','${courseName}',${student.marks},'${student.result}')">
        Download Marksheet
      </button>
    `;

    container.appendChild(card);
    container.classList.remove('hidden');

    if (student.result === 'Pass') {
      startConfetti();
    } else {
      alert('😢 Better Luck Next Time!');
    }
  } else {
    container.innerHTML = '<div class="result-card"><p>Result not found. Check your Roll No and Course selection.</p></div>';
    container.classList.remove('hidden');
  }
}

function downloadPDF(name, roll, course, marks, result) {
  const doc = new jsPDF();
  
  // Add logo or header
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 150);
  doc.text('EDUCATION BOARD', 105, 20, null, null, 'center');
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('OFFICIAL MARKSHEET', 105, 30, null, null, 'center');
  
  // Add student details
  doc.setFontSize(12);
  doc.text(`Name: ${name}`, 20, 50);
  doc.text(`Roll Number: ${roll}`, 20, 60);
  doc.text(`Course: ${course}`, 20, 70);
  
  // Add marks section
  doc.setFontSize(14);
  doc.text('Examination Results', 105, 90, null, null, 'center');
  
  doc.setFontSize(12);
  doc.text(`Marks Obtained: ${marks}`, 20, 110);
  doc.text(`Maximum Marks: 100`, 20, 120);
  
  // Add result status
  doc.setFontSize(14);
  doc.setTextColor(result === 'Pass' ? 0, 100, 0 : 150, 0, 0);
  doc.text(`Result: ${result}`, 105, 140, null, null, 'center');
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('This is a computer generated document. No signature required.', 105, 280, null, null, 'center');
  
  // Save the PDF
  doc.save(`${name}_${roll}_Marksheet.pdf`);
}

function startConfetti() {
  // Simple confetti effect using alert - replace with actual confetti library if needed
  alert('🎉 Congratulations on Passing!');
}
