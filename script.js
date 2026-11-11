
document.addEventListener("DOMContentLoaded", () => {

    // 1. Mengambil elemen HTML
    const btnFetch = document.querySelector("#btnFetch");
    const statusMessage = document.querySelector("#statusMessage");
    const userList = document.querySelector("#userList");

    // 2. Fungsi asynchronous untuk mengambil data API
    const fetchUsers = async () => {

        // Menampilkan loading
        btnFetch.disabled = true;
        statusMessage.textContent = "Sedang memuat data dari server...";
        statusMessage.className = "status-msg";
        userList.innerHTML = "";

        try {

            // Mengirim permintaan HTTP ke API
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            // Memeriksa respons server
            if (!response.ok) {
                throw new Error(
                    `Gagal mengambil data! Status HTTP: ${response.status}`
                );
            }

            // Mengubah respons menjadi JSON
            const users = await response.json();

            // Menampilkan pesan berhasil
            statusMessage.textContent =
                `Berhasil memuat ${users.length} data pengguna!`;

            // Menampilkan data pengguna
            renderUsers(users);

        } catch (error) {

            // Menangani kesalahan
            statusMessage.textContent =
                `Gagal memuat data: ${error.message}`;

            statusMessage.className = "status-msg error";

        } finally {

            // Mengaktifkan kembali tombol
            btnFetch.disabled = false;

        }
    };

    // 3. Fungsi menampilkan data pengguna
    const renderUsers = (users) => {

        userList.innerHTML = "";

        users.forEach(user => {

            const card = document.createElement("div");
            card.className = "user-card";

            const name = document.createElement("div");
            name.className = "user-name";
            name.textContent = user.name;

            const email = document.createElement("div");
            email.className = "user-email";
            email.textContent = user.email;

            const company = document.createElement("div");
            company.className = "user-company";
            company.textContent = user.company.name;

            card.appendChild(name);
            card.appendChild(email);
            card.appendChild(company);

            userList.appendChild(card);

        });
    };

    // 4. Event listener tombol
    btnFetch.addEventListener("click", fetchUsers);

});
