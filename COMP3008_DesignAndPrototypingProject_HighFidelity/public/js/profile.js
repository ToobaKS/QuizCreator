editNameButton = document.getElementById('editName');
editNamePopup = document.getElementById('editNamePopup');

editEmailButton = document.getElementById('editEmail');
editEmailPopup = document.getElementById('editEmailPopup');

editSchoolButton = document.getElementById('editSchool');
editSchoolPopup = document.getElementById('editSchoolPopup');

editDOBButton = document.getElementById('editDOB');
editDOBPopup = document.getElementById('editDobPopup');

editPasswordButton = document.getElementById('editPassword');
editPasswordPopup = document.getElementById('editPasswordPopup');

function openEditPopup(popup) {
  popup.style.display = 'block';
}

function closeEditPopup(popup) {
  popup.style.display = 'none';
}

editNameButton.addEventListener('click', () => {
  openEditPopup(editNamePopup);
});

editSchoolButton.addEventListener('click', () => {
  openEditPopup(editSchoolPopup);
});

editDOBButton.addEventListener('click', () => {
  openEditPopup(editDOBPopup);
});

editEmailButton.addEventListener('click', () => {
  openEditPopup(editEmailPopup);
});

editPasswordButton.addEventListener('click', () => {
  openEditPopup(editPasswordPopup);
});

document.getElementById('cancelName').addEventListener('click', () => {
  closeEditPopup(editNamePopup);
});

document.getElementById('cancelEmail').addEventListener('click', () => {
  closeEditPopup(editEmailPopup);
});

document.getElementById('cancelSchool').addEventListener('click', () => {
  closeEditPopup(editSchoolPopup);
});

document.getElementById('cancelDOB').addEventListener('click', () => {
  closeEditPopup(editDOBPopup);
});

document.getElementById('cancelPassword').addEventListener('click', () => {
  closeEditPopup(editPasswordPopup);
});

document.getElementById('saveName').addEventListener('click', () => {
  newName = document.getElementById('editNameInput').value;
  const password = document.getElementById('editNamePasswordInput').value;
  document.getElementById('nameDisplay').textContent = newName;
  closeEditPopup(editNamePopup);
});

document.getElementById('saveEmail').addEventListener('click', () => {
  newEmail = document.getElementById('editEmailInput').value;
  password = document.getElementById('editEmailPasswordInput').value;
  document.getElementById('emailDisplay').textContent = newEmail;
  closeEditPopup(editEmailPopup);
});

document.getElementById('saveSchool').addEventListener('click', () => {
  newSchool = document.getElementById('editSchoolInput').value;
  password = document.getElementById('editSchoolPasswordInput').value;
  document.getElementById('schoolDisplay').textContent = newSchool;
  closeEditPopup(editSchoolPopup);
});

document.getElementById('saveDOB').addEventListener('click', () => {
  newDOB = document.getElementById('editDOBInput').value;
  password = document.getElementById('editDOBPasswordInput').value;
  document.getElementById('dobDisplay').textContent = newDOB;
  closeEditPopup(editDOBPopup);
});

document.getElementById('savePassword').addEventListener('click', () => {
  newPassword = document.getElementById('editPasswordInput').value;
  currentPassword = document.getElementById('editPasswordCurrentInput').value;
  document.getElementById('passwordDisplay').textContent = newPassword;
  closeEditPopup(editPasswordPopup);
});