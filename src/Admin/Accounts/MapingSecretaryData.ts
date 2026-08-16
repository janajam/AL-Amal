import type { Account } from "../../Entities/AccountsData";
import type { SecretaryData } from "../../Entities/SecreraryData";


export const mapSecretaryToAccount = (secretary: SecretaryData): Account => {
    return {
        id: secretary.id,
        name: secretary.user.full_name,
        email: secretary.user.email,
        phoneNumber: secretary.user.phone,
        role: "Secretary",
        status: "ACTIVE",       // غير متوفر من الـ API حالياً
        // department: secretary.department,
    };
};