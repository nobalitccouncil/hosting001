const students = {
    PGDCA: [
      { roll: 'PG001', name: 'Ramesh Verma', marks: 85, result: 'Pass' },
      { roll: 'PG002', name: 'Sonal Jain', marks: 67, result: 'Pass' },
    ],
    ADCA: [
      { roll: 'AD001', name: 'Vikram Mehta', marks: 75, result: 'Pass' },
      { roll: 'AD002', name: 'Sneha Raj', marks: 49, result: 'Fail' }, // Changed to 'Fail' since 49 is typically failing
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
    if (mainCourse === 'Computer') {
      studentList = students[subCourse];
    } else {
      studentList = students['Cutting'];
    }
  
    const student = studentList.find(s => s.roll === rollInput);
  
    if (student) {
      const emoji = student.result === 'Pass' ? '🎉' : '😢';
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <div class="emoji">${emoji}</div>
        <h2>${student.name}</h2>
        <p><strong>Roll No:</strong> ${student.roll}</p>
        <p><strong>Course:</strong> ${mainCourse}${subCourse ? ' - ' + subCourse : ''}</p>
        <p><strong>Marks:</strong> ${student.marks}</p>
        <p><strong>Status:</strong> ${student.result}</p>
        <button onclick="downloadPDF('${student.name}','${student.roll}','${mainCourse} ${subCourse}',${student.marks},'${student.result}')">Download Marksheet</button>
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
    // Make sure jsPDF is loaded before calling this function
    if (typeof jsPDF !== 'undefined') {
      const doc = new jsPDF();
      doc.text('Student Marksheet', 20, 20);
      doc.text(`Name: ${name}`, 20, 40);
      doc.text(`Roll No: ${roll}`, 20, 50);
      doc.text(`Course: ${course}`, 20, 60);
      doc.text(`Marks: ${marks}`, 20, 70);
      doc.text(`Status: ${result}`, 20, 80);
      doc.save(`${name}_Marksheet.pdf`);
    } else {
      alert('PDF generation library not loaded!');
    }
  }
  
  function startConfetti() {
    // Simple confetti effect - you can replace with a proper library if needed
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // Fallback if confetti.js isn't loaded
        alert('🎉 Congratulations on Passing!');
      }
    } catch (e) {
      console.error('Confetti error:', e);
      alert('🎉 Congratulations on Passing!');
    }
  }