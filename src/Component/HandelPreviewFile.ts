// أضف axios إلى الاستيرادات في أعلى الملف إذا لم يكن موجوداً
import axios from "axios";
import { useState } from "react";

// داخل المكون EditTestResultDialog
 export const handlePreview = async (fileUrl: string) => {

    const [snackbar, setSnackbar] = useState({
            open: false,
            message: "",
            severity: "success" as "success" | "error",
        });
    
    try {
        // إذا كان الرابط هو Blob محلي (ملف تم اختياره الآن من الجهاز)
        if (fileUrl.startsWith("blob:")) {
            window.open(fileUrl, "_blank");
            return;
        }

        // احصل على التوكن من LocalStorage (أو من أينما تحفظه)
        const token = localStorage.getItem("token"); // أبدل باسم المفتاح لديك

        const response = await axios.get(fileUrl, {
            responseType: "blob", // نطلب من السيرفر إرجاع الملف كـ Binary Blob
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // إنشاء رابط مؤقت من الملف المحمل
        const blob = new Blob([response.data], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);

        // فتح الملف في تبويب جديد
        window.open(blobUrl, "_blank");
    } catch (error) {
        console.error("Failed to preview file:", error);
        setSnackbar({
            open: true,
            message: "Failed to load PDF file (Access Denied / 403)",
            severity: "error",
        });
    }
};