function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  // Setel jam, menit, dan detik menjadi nilai tertinggi
  currentDate.setHours(23, 59, 59);

  // Mendapatkan tahun, bulan, dan tanggal
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena bulan dimulai dari 0
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Mendapatkan jam, menit, dan detik
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Format hasil sesuai dengan kebutuhan
  const formattedDateTime = `${year}-${month}-${day}+${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export default getCurrentDateTimeFormatted;
