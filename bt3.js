let choice;
let memberType = "";
let isMemberValid = false;
let borrowedItemsString = "";

do {
    // 1. Hiển thị Menu điều khiển
    console.log("\n=========================================");
    console.log("   HỆ THỐNG ĐIỀU PHỐI HẬU CẦN PHÒNG GYM  ");
    console.log("=========================================");
    console.log("1. Tiếp nhận và xác thực thẻ hội viên");
    console.log("2. Ghi nhận chuỗi vật tư mượn thêm");
    console.log("3. In phiếu bàn giao tủ đồ và tính tiền");
    console.log("4. Đóng ca làm việc và thoát");
    console.log("=========================================");

    // Giả lập lệnh nhập
    choice = prompt("Vui lòng chọn chức năng (1-4):");

    switch (choice) {
        case "1":
            let inputType = prompt("Nhập phân hạng thẻ (VIP hoặc STANDARD):");
            if (inputType) {
                memberType = inputType.trim().toUpperCase();
                if (memberType === "VIP" || memberType === "STANDARD") {
                    isMemberValid = true;
                    // Reset chuỗi mượn đồ khi có khách mới
                    borrowedItemsString = ""; 
                    console.log(`=> Đã xác thực hội viên hạng: ${memberType}`);
                } else {
                    isMemberValid = false;
                    console.log("=> LỖI: Hạng thẻ không hợp lệ!");
                }
            }
            break;

        case "2":
            if (!isMemberValid) {
                console.log("=> LỖI: Vui lòng xác thực thẻ (Chức năng 1) trước!");
                break;
            }
            let itemsInput = prompt("Nhập chuỗi vật tư (VD: TOWEL:2|LOCK:1):");
            if (itemsInput) {
                borrowedItemsString = itemsInput.trim().toUpperCase();
                console.log(`=> Đã ghi nhận chuỗi vật tư: ${borrowedItemsString}`);
            }
            break;

        case "3":
            if (!isMemberValid) {
                console.log("=> LỖI: Chưa có thông tin hội viên hợp lệ.");
                break;
            }

            // Phân bổ tủ đồ
            let zone = memberType === "VIP" ? "ZONE-A" : "ZONE-B";
            
            let towelCount = 0;
            let lockCount = 0;
            let depositFee = 0;

            // Bóc tách chuỗi bằng vòng lặp kết hợp indexOf() và slice()
            if (borrowedItemsString.length > 0) {
                depositFee = 50000; // Có mượn đồ thì tính cọc
                
                let remainingStr = borrowedItemsString;
                
                while (remainingStr.length > 0) {
                    let pipeIndex = remainingStr.indexOf('|');
                    let currentItem = "";

                    if (pipeIndex !== -1) {
                        currentItem = remainingStr.slice(0, pipeIndex);
                        remainingStr = remainingStr.slice(pipeIndex + 1);
                    } else {
                        currentItem = remainingStr;
                        remainingStr = ""; // Hết chuỗi
                    }

                    // Tách tên vật tư và số lượng
                    let colonIndex = currentItem.indexOf(':');
                    if (colonIndex !== -1) {
                        let itemName = currentItem.slice(0, colonIndex);
                        let itemQty = parseInt(currentItem.slice(colonIndex + 1));

                        if (itemName === "TOWEL") towelCount += itemQty;
                        if (itemName === "LOCK") lockCount += itemQty;
                    }
                }
            }

            // Tính toán chi phí và áp dụng ưu đãi VIP
            let chargeableTowels = towelCount;
            let freeTowelNotice = "";
            
            if (memberType === "VIP") {
                freeTowelNotice = "(Đã miễn phí 1 khăn tắm lớn)";
                chargeableTowels = Math.max(0, towelCount - 1);
            }

            let towelFee = chargeableTowels * 20000;
            let lockFee = lockCount * 15000;
            let totalFee = towelFee + lockFee + depositFee;

            // In phiếu bàn giao bằng Template Literals và Padding
            console.log(`\n${"-".repeat(45)}`);
            console.log("PHIẾU BÀN GIAO TỦ ĐỒ VÀ VẬT TƯ".padStart(37));
            console.log(`${"-".repeat(45)}`);
            console.log(`Hạng thẻ: ${memberType}`);
            console.log(`Khu vực tủ được cấp: ${zone}`);
            console.log(`\nChi tiết mượn vật tư:`);
            console.log(`- Khăn tắm (x${towelCount}):`.padEnd(25) + `${towelFee.toString().padStart(10)} VNĐ`);
            if (memberType === "VIP") console.log(`  ${freeTowelNotice}`);
            console.log(`- Khóa phụ (x${lockCount}):`.padEnd(25) + `${lockFee.toString().padStart(10)} VNĐ`);
            console.log(`- Tiền cọc hoàn trả:`.padEnd(25) + `${depositFee.toString().padStart(10)} VNĐ`);
            console.log(`${"-".repeat(45)}`);
            console.log(`TỔNG PHỤ PHÍ CẦN THU:`.padEnd(25) + `${totalFee.toString().padStart(10)} VNĐ`);
            console.log(`${"-".repeat(45)}`);
            
            // Đặt lại trạng thái sau khi xuất phiếu
            isMemberValid = false;
            borrowedItemsString = "";
            break;

        case "4":
            console.log("=> Đã đóng ca làm việc. Hẹn gặp lại!");
            break;

        default:
            console.log("=> LỰA CHỌN KHÔNG HỢP LỆ. Vui lòng nhập từ 1 đến 4.");
            break;
    }
} while (choice !== "4");
