let absensi_form = document.getElementById('absensi_form');
let fullname = document.getElementById('fullname');
let btnSubmit = document.getElementById('btnSubmit');
let root = document.getElementById('root');

let absensi_data = [];

let siswa = {
  fullname: '',
  date: '',
};

const monthNames = [
  'Januari',
  'Febuari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const getCurrentDateNew = () => {
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString();
  return `${date} ${time}`;
};

const getCurrentDate = () => {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    ' ' +
    monthNames[currentdate.getMonth()] +
    // (currentdate.getMonth() + 1) +
    ' ' +
    currentdate.getFullYear() +
    ' - ' +
    (currentdate.getHours().toString().length < 2
      ? '0' + currentdate.getHours()
      : currentdate.getHours()) +
    ':' +
    (currentdate.getMinutes().toString().length < 2
      ? '0' + currentdate.getMinutes()
      : currentdate.getMinutes()) +
    ':' +
    (currentdate.getSeconds().toString().length < 2
      ? '0' + currentdate.getSeconds()
      : currentdate.getSeconds());
  return datetime;
};

function validateInputs(e) {
  let disabled = false;

  siswa.fullname = fullname.value;

  if (siswa.fullname.length === 0 || fullname.value === 0) {
    disabled = true;
  }

  if (disabled) {
    btnSubmit.disabled = true;
  } else {
    btnSubmit.disabled = false;
  }
}

fullname.addEventListener('keyup', (e) => {
  validateInputs(e);
});

absensi_form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (fullname.required == false) {
    fullname.required = true;
    alert('Wajib Isi Dulu Boy!');
    return;
  }

  siswa.date = getCurrentDate();
  let newSiswa = Object.assign({}, siswa);
  absensi_data.push(newSiswa);
  fullname.value = '';
  renderToHtml();
  validateInputs(e);
});

function handleDelete(index) {
  let confDelete = confirm('Yakin ingin menghapus ?');
  if (!confDelete) {
    return;
  }
  const newAbsensiData = absensi_data.filter((e, i) => i !== index);
  absensi_data = newAbsensiData;
  renderToHtml();
}

function handleEdit(index) {
  let newValue = prompt('Masukan Nama Baru');
  if (!newValue) {
    return;
  }
  absensi_data[index].fullname = newValue;
  renderToHtml();
}

function renderToHtml() {
  root.innerHTML = '';

  absensi_data.forEach((e, i) => {
    root.innerHTML += `
    <div class="card" draggable="true" ondragend="handleDelete(${i})">
      <span> ${i + 1}. &nbsp;<b>${e.fullname}</b> </span>
      <span> ${
        e.date
      } <button onclick="handleEdit(${i})">Edit</button> <button onclick="handleDelete(${i})">Delete</button> </span>
    </div>`;
  });
}
