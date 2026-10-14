
        const customers = [
    {
        name: "Nguyễn Minh Anh",
        email: "minhanh@email.com",
        budget: "20.000.000 đ",
        goal: "60%",
        risk: "Thấp",
        updated: "1 giờ trước",
        status: "Đang hỗ trợ"
    },
    {
        name: "Trần Quốc Bảo",
        email: "quocbao@email.com",
        budget: "15.500.000 đ",
        goal: "42%",
        risk: "Cao",
        updated: "Hôm qua",
        status: "Đang hỗ trợ"
    },
    {
        name: "Lê Thu Hà",
        email: "thuha@email.com",
        budget: "28.000.000 đ",
        goal: "71%",
        risk: "Trung bình",
        updated: "2 ngày trước",
        status: "Đang hỗ trợ"
    },
    {
        name: "Phạm Gia Huy",
        email: "giahuy@email.com",
        budget: "18.000.000 đ",
        goal: "88%",
        risk: "Thấp",
        updated: "3 ngày trước",
        status: "Hoàn thành"
    }
];

/* 2. Lấy các phần tử HTML bằng id */
const rows = document.getElementById("customerRows");
const search = document.getElementById("search");
const riskFilter = document.getElementById("riskFilter");
const statusFilter = document.getElementById("statusFilter");
const count = document.getElementById("count");
const message = document.getElementById("message");

/* 3. Hàm hiển thị danh sách khách hàng */
function renderCustomers() {

    // Lấy nội dung ô tìm kiếm và bộ lọc
    const keyword = search.value.trim().toLowerCase();
    const selectedRisk = riskFilter.value;
    const selectedStatus = statusFilter.value;

    // Lọc danh sách theo tên/email, rủi ro và trạng thái
    const result = customers.filter(function(customer) {

        const matchesKeyword =
            customer.name.toLowerCase().includes(keyword) ||
            customer.email.toLowerCase().includes(keyword);

        const matchesRisk =
            selectedRisk === "" ||
            customer.risk === selectedRisk;

        const matchesStatus =
            selectedStatus === "" ||
            customer.status === selectedStatus;

        return matchesKeyword && matchesRisk && matchesStatus;
    });

    // Xóa các dòng cũ trước khi hiển thị kết quả mới
    rows.innerHTML = "";

    // Nếu không tìm thấy khách hàng
    if (result.length === 0) {
        rows.innerHTML =
            '<tr><td colspan="6">Không tìm thấy khách hàng phù hợp.</td></tr>';
    } else {

        // Duyệt qua từng khách hàng trong kết quả
        result.forEach(function(customer) {

            // Chọn màu chữ theo mức rủi ro
            let riskClass = "risk";

            if (customer.risk === "Trung bình") {
                riskClass += " medium";
            }

            if (customer.risk === "Cao") {
                riskClass += " high";
            }

            // Tạo một dòng trong bảng
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <strong>${customer.name}</strong><br>
                    <span style="color:#718692">${customer.email}</span>
                </td>
                <td>${customer.budget}</td>
                <td>${customer.goal}</td>
                <td class="${riskClass}">${customer.risk}</td>
                <td>${customer.updated}</td>
                <td>
                    <button class="view" data-name="${customer.name}">
                        Xem
                    </button>
                </td>
            `;

            // Thêm dòng vừa tạo vào bảng
            rows.appendChild(row);
        });
    }

    // Cập nhật số lượng kết quả
    count.textContent =
        `Đang hiển thị ${result.length} / ${customers.length} khách hàng mẫu`;
}

/* 4. Tìm kiếm và lọc khi người dùng thao tác */
search.addEventListener("input", renderCustomers);

riskFilter.addEventListener("change", renderCustomers);

statusFilter.addEventListener("change", renderCustomers);


/* 5. Xử lý khi bấm nút Xem */

rows.addEventListener("click", function(event) {

    // Kiểm tra người dùng có bấm nút Xem không
    const button = event.target.closest(".view");

    // Nếu không bấm nút Xem thì dừng
    if (!button) {
        return;
    }

    // Lấy tên khách hàng được chọn
    const customerName = button.dataset.name;

    // Mã hóa tên khách hàng để truyền qua đường dẫn
    const encodedName = encodeURIComponent(customerName);

    // Chuyển sang trang 9 và gửi tên khách hàng
    window.location.href =
        "thuchanh2.html?customer=" + encodedName;

});


/* 6. Hiển thị danh sách ngay khi mở trang */
renderCustomers();