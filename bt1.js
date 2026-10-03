let choice;
let orderCode = "";
let isValidOrder = false;

// 3 TRƯỜNG HỢP THỬ NGHIỆM (Test Cases) để nhập vào prompt:
// 1. Đơn hàng hợp lệ thẻ VIP: "  vip-shaker-strap  " (Chuẩn hóa thành VIP-SHAKER-STRAP, giảm 10%)
// 2. Mã đơn không hợp lệ: "  vip  " (Độ dài dưới 8 ký tự, báo lỗi)
// 3. Thoát chương trình: Chọn chức năng số "3"

do {
    // Hiển thị Menu điều khiển
    console.log("\n" + "-".repeat(40));
    console.log("HỆ THỐNG QUẢN LÝ PHỤ KIỆN GYM FITNESS");
    console.log("1. Nhập và chuẩn hóa mã đơn hàng");
    console.log("2. Tính tiền và in hóa đơn");
    console.log("3. Thoát chương trình");
    console.log("-".repeat(40));
    
    // Giả lập lệnh nhập từ người dùng
    choice = prompt("Vui lòng chọn chức năng (1-3):");

    switch (choice) {
        case "1":
            // Nhập và chuẩn hóa mã đơn hàng
            let inputCode = prompt("Nhập mã đơn hàng (VD: VIP-SHAKER-GLOVES hoặc NOR-STRAP):");
            if (inputCode) {
                // Sử dụng trim() và toUpperCase()
                orderCode = inputCode.trim().toUpperCase();
                
                // Kiểm tra độ dài tối thiểu 8 ký tự
                if (orderCode.length >= 8) {
                    isValidOrder = true;
                    console.log("=> Chuẩn hóa thành công. Mã đơn hiện tại: " + orderCode);
                } else {
                    isValidOrder = false;
                    console.log("=> LỖI: Mã đơn hàng không hợp lệ (tối thiểu 8 ký tự)!");
                }
            }
            break;

        case "2":
            // Kiểm tra tính hợp lệ của mã đơn hàng trước khi in
            if (!isValidOrder) {
                console.log("=> LỖI: Chưa có mã đơn hàng hợp lệ. Vui lòng chọn (1) để nhập.");
                break;
            }

            // Bóc tách đơn hàng
            // Kiểm tra thẻ VIP bằng startsWith()
            let isVip = orderCode.startsWith("VIP-");
            
            // Dùng slice() cắt bỏ phần tiền tố (VD: "VIP-" hoặc "NOR-")
            let itemsString = orderCode.slice(4); 
            let itemsArray = itemsString.split("-");
            
            let totalAmount = 0;
            let receiptDetails = "";

            // Vòng lặp for để xử lý tính tiền
            for (let i = 0; i < itemsArray.length; i++) {
                let itemCode = itemsArray[i];
                let itemName = "";
                let itemPrice = 0;

                if (itemCode === "SHAKER") {
                    itemName = "Bình lắc";
                    itemPrice = 120000;
                } else if (itemCode === "GLOVES") {
                    itemName = "Găng tay";
                    itemPrice = 180000;
                } else if (itemCode === "STRAP") {
                    itemName = "Dây kéo lưng";
                    itemPrice = 150000;
                }

                if (itemPrice > 0) {
                    totalAmount += itemPrice;
                    // Sử dụng padStart để căn lề phải cho giá tiền
                    receiptDetails += itemName.padEnd(20) + itemPrice.toString().padStart(12) + " VNĐ\n";
                }
            }

            // Tính toán giảm giá VIP (10%)
            let discount = isVip ? (totalAmount * 0.1) : 0;
            let finalPay = totalAmount - discount;

            // In hóa đơn dạng bảng sử dụng repeat() và padStart()
            console.log("\n" + "-".repeat(40));
            console.log("HÓA ĐƠN BÁN LẺ".padStart(26));
            console.log("-".repeat(40));
            console.log("Mã đơn: " + orderCode);
            console.log("-".repeat(40));
            console.log(receiptDetails.trimEnd()); // In danh sách sản phẩm
            console.log("-".repeat(40));
            console.log("Tạm tính:".padEnd(20) + totalAmount.toString().padStart(12) + " VNĐ");
            console.log("Ưu đãi VIP (10%):".padEnd(20) + discount.toString().padStart(12) + " VNĐ");
            console.log("Thành tiền:".padEnd(20) + finalPay.toString().padStart(12) + " VNĐ");
            console.log("-".repeat(40));
            break;

        case "3":
            console.log("=> Đã thoát chương trình. Hẹn gặp lại!");
            break;

        default:
            // Nhánh xử lý các lựa chọn không hợp lệ
            console.log("=> LỰA CHỌN KHÔNG HỢP LỆ. Vui lòng chỉ nhập 1, 2 hoặc 3.");
            break;
    }
} while (choice !== "3");
