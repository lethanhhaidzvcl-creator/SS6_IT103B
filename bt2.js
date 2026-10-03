let choice;

// 1. Khởi tạo các biến duy trì trạng thái qua từng vòng lặp
let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

// Các biến lưu trữ tạm thời cho hồ sơ đang xử lý
let isRegistered = false;
let currentPackage = "";
let currentMonths = 0;
let currentPtSessions = 0;

// Lấy năm hiện tại để kiểm tra mã check-in
const currentYear = new Date().getFullYear(); 

do {
    // Hiển thị Menu
    console.log("\n=========================================");
    console.log("      HỆ THỐNG QUẢN LÝ GYM FITNESS       ");
    console.log("=========================================");
    console.log("1. Đăng ký và chuẩn hóa hồ sơ hội viên mới");
    console.log("2. Tính tiền gói tập và áp dụng giảm giá");
    console.log("3. Quét mã thẻ check-in tại cửa quay");
    console.log("4. Xuất báo cáo thống kê ca trực và thoát");
    console.log("=========================================");

    // Giả lập lệnh nhập (Sử dụng prompt trong môi trường trình duyệt)
    choice = prompt("Nhập lựa chọn của bạn (1-4):");

    switch (choice) {
        case "1":
            let pkg = prompt("Nhập gói tập (STANDARD hoặc VIP):");
            if (pkg) {
                currentPackage = pkg.trim().toUpperCase();
                if (currentPackage === "STANDARD" || currentPackage === "VIP") {
                    currentMonths = parseInt(prompt("Nhập số tháng đăng ký:"));
                    currentPtSessions = parseInt(prompt("Nhập số buổi PT kèm riêng:"));
                    
                    if (currentMonths > 0 && currentPtSessions >= 0) {
                        isRegistered = true;
                        console.log(`=> Đã tạo hồ sơ: Gói ${currentPackage}, ${currentMonths} tháng, ${currentPtSessions} buổi PT.`);
                    } else {
                        console.log("=> LỖI: Số tháng hoặc số buổi PT không hợp lệ.");
                    }
                } else {
                    console.log("=> LỖI: Gói tập không tồn tại.");
                }
            }
            break;

        case "2":
            // Ngăn chặn tính tiền nếu chưa đăng ký
            if (!isRegistered) {
                console.log("=> LỖI: Chưa có hồ sơ đăng ký. Vui lòng chọn (1) trước.");
                break;
            }

            // Tính toán biểu phí
            let basePrice = currentPackage === "VIP" ? 800000 : 500000;
            let packageCost = basePrice * currentMonths;
            let ptCost = currentPtSessions * 300000;
            
            // Xác định mức chiết khấu
            let discountRate = 0;
            if (currentMonths >= 12) {
                discountRate = 0.25;
            } else if (currentMonths >= 6) {
                discountRate = 0.15;
            }
            
            let discountAmount = packageCost * discountRate;
            let finalPay = packageCost - discountAmount + ptCost;

            // Cập nhật trạng thái tổng
            totalRevenue += finalPay;
            registeredMembers++;
            isRegistered = false; // Reset cờ trạng thái sau khi thanh toán xong

            // In hóa đơn
            console.log("\n--- HÓA ĐƠN ĐĂNG KÝ ---");
            console.log(`Gói tập: ${currentPackage.padEnd(15)} ${packageCost.toString().padStart(10)} VNĐ`);
            console.log(`Chiết khấu (${discountRate * 100}%): -${discountAmount.toString().padStart(9)} VNĐ`);
            console.log(`Phí PT (${currentPtSessions} buổi):  ${ptCost.toString().padStart(10)} VNĐ`);
            console.log(`-------------------------`);
            console.log(`Tổng thanh toán: ${finalPay.toString().padStart(10)} VNĐ`);
            console.log("=> Thanh toán thành công!");
            break;

        case "3":
            let checkInCode = prompt("Nhập mã thẻ check-in (Ví dụ: GYM-VIP-2024):");
            if (checkInCode) {
                let code = checkInCode.trim().toUpperCase();
                
                // Quy tắc kiểm tra mã thẻ
                if (code.startsWith("GYM-") && code.endsWith(`-${currentYear}`)) {
                    checkInCount++;
                    console.log(`=> Check-in hợp lệ! Chào mừng hội viên.`);
                } else {
                    console.log(`=> LỖI: Mã thẻ không hợp lệ hoặc đã hết hạn.`);
                }
            }
            break;

        case "4":
            // In báo cáo tổng kết
            console.log("\n=========================================");
            console.log("        BÁO CÁO TỔNG KẾT CA TRỰC         ");
            console.log("=========================================");
            console.log(`Số hội viên đăng ký mới : ${registeredMembers}`);
            console.log(`Số lượt quét mã check-in: ${checkInCount}`);
            console.log(`Tổng doanh thu ca trực  : ${totalRevenue} VNĐ`);
            console.log("=========================================");
            console.log("=> Đã thoát chương trình. Hẹn gặp lại!");
            break;

        default:
            console.log("=> LỰA CHỌN KHÔNG HỢP LỆ. Vui lòng chọn từ 1 đến 4.");
            break;
    }
} while (choice !== "4");
