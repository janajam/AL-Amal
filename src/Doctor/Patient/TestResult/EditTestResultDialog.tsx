
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import type { LabResult } from "../../../Entities/Patient";
// import { useEditTestResult } from "../../../Hook/UseEditTestResult";
// import { editTestResultSchema, type EditTestResultInput } from "../../../Schema/EditTestResultSchema";
// import { handlePreview } from "../../../Component/HandelPreviewFile";

// interface Props {
//     open: boolean;
//     result: LabResult | null;
//     medicalRecordId: number;
//     patientId: number;
//     onClose: () => void;
// }

// const EditTestResultDialog = ({ open, result, onClose, patientId, medicalRecordId }: Props) => {
//     const [removeOldFile, setRemoveOldFile] = useState(false);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState("");
//     const theme = useTheme();
//     const { mutate: editResult, isPending } = useEditTestResult(result?.id ?? 0, patientId);

//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success" as "success" | "error",
//     });


//     const handleRemoveFile = () => {
//         editResult(
//             { remove_attachment: true },
//             {
//                 onSuccess: (response) => {
//                     setSnackbar({
//                         open: true,
//                         message: "Attachment removed successfully",
//                         severity: "success",
//                     });
//                     setRemoveOldFile(true);
//                 },
//                 onError: (error: any) => {
//                     setSnackbar({
//                         open: true,
//                         message: error.response?.data?.message ?? "Failed to remove attachment",
//                         severity: "error",
//                     });
//                 },
//             }
//         )
//     }


//     const {
//         register,
//         handleSubmit,
//         reset,
//         setValue,
//         watch,
//         formState: { errors },
//     } = useForm<EditTestResultInput>({
//         resolver: zodResolver(editTestResultSchema),
//         mode: "onChange",
//         defaultValues: {
//             result: "",
//         },
//     });

//     // 1. إعادة ضبط الحالة عند فتح/إغلاق النافذة
//     useEffect(() => {
//         if (!open || !result) return;

//         reset({
//             result: result.result,
//         });

//         setSelectedFile(null);
//         setRemoveOldFile(false);
//     }, [open, result, reset]);

//     // 2. معالجة معاينة الملف الجديد (PDF)
//     useEffect(() => {
//         if (!selectedFile) {
//             setPreviewUrl("");
//             return;
//         }

//         // إنشاء رابط وهمي لمعاينة الملف المرفوع حديثاً
//         const url = URL.createObjectURL(selectedFile);
//         setPreviewUrl(url);

//         return () => URL.revokeObjectURL(url);
//     }, [selectedFile]);

//     const handelCancel = () => {
//         reset();
//         onClose();
//     };



//     const submitDialog = (data: EditTestResultInput) => {
//         const formData = new FormData();

//         // 1. إضافة النص
//         formData.append("result", data.result);

//         // 2. إذا اختار المستخدم ملف جديد (استخدم selectedFile مباشرة)
//         if (selectedFile) {
//             formData.append("attachment", selectedFile);
//         }

//         // 3. إذا طلب حذف الملف القديم ولم يرفع ملفاً جديداً
//         if (removeOldFile && !selectedFile) {
//             formData.append("remove_attachment", "1");
//         }

//         editResult(formData, {
//             onSuccess: (response) => {
//                 setSnackbar({
//                     open: true,
//                     message: response.message,
//                     severity: "success",
//                 });
//                 onClose();
//             },
//             onError: (error: any) => {
//                 setSnackbar({
//                     open: true,
//                     message: error.response?.data?.message ?? 'Failed to update result',
//                     severity: "error",
//                 });
//             }
//         });
//     };

    

//     return (
//         <div>
//             <Dialog
//                 open={open}
//                 onClose={onClose}
//                 sx={{
//                     '& .MuiBackdrop-root': {
//                         backgroundColor: 'rgba(0, 0, 0, 0.22)',
//                     },
//                     '& .MuiDialog-paper': {
//                         width: { xs: '99vw', sm: 520, md: 620 },
//                         maxWidth: 'none',
//                         backgroundImage: 'none',
//                         boxShadow: 'none',
//                     },
//                 }}
//             >
//                 <DialogTitle sx={{
//                     fontSize: 17,
//                     fontWeight: 700,
//                     color: theme.palette.primary.main
//                 }}>
//                     Edit Test Result
//                 </DialogTitle>
//                 <DialogContent>
//                     <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
//                         <Stack spacing={2}>
//                             <Typography sx={{ fontSize: 16, fontWeight: 550 }}>
//                                 Result Description
//                             </Typography>
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 {...register("result")}
//                                 error={!!errors.result}
//                                 helperText={errors.result?.message}
//                                 multiline 
                            
//                             />



//                             {result?.attachment && !removeOldFile && !selectedFile && (

//                                 <Stack spacing={3} sx={{ mt: 2 }}>
//                                     <Stack direction={'row'} spacing={3} sx={{ alignItems: "center" }}>
//                                         <Typography sx={{ fontWeight: 600 }}>
//                                             Current Report
//                                         </Typography>
//                                     </Stack>


//                                     <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
//                                         <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
//                                             <Stack spacing={0.5}>
//                                                 <Typography sx={{ fontWeight: 600 }}>
//                                                     {result?.title}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     PDF Document
//                                                 </Typography>
//                                             </Stack>

//                                             <Stack direction="row" spacing={1}>
//                                                 <Button
//                                                     variant="outlined"
//                                                     onClick={() => {
//                                                         if (result?.attachment) {
//                                                             handlePreview(result.attachment);
//                                                         }
//                                                     }}
//                                                 >
//                                                     Preview
//                                                 </Button>
//                                                 <Button
//                                                     variant="outlined"
//                                                     color="error"
//                                                     disabled={isPending}
//                                                     onClick={handleRemoveFile}
//                                                 >

//                                                     Remove
//                                                 </Button>
//                                             </Stack>
//                                         </Stack>
//                                     </Paper>
//                                 </Stack>
//                             )}

//                             <Divider />

                        
//                             <Button
//                                 component="label"
//                                 variant="outlined"
//                                 fullWidth
//                                 sx={{ borderStyle: 'dashed' }}
//                             >
//                                 {selectedFile ? 'Change PDF File' : 'Upload New PDF'}
//                                 <input
//                                     hidden
//                                     type="file"
//                                     accept="application/pdf"
//                                     onChange={(e) => {
//                                         const file = e.target.files?.[0];
//                                         if (!file) return;
//                                         setSelectedFile(file);
//                                         setValue("attachment", file, { shouldValidate: true });
//                                         setRemoveOldFile(true);
//                                     }}
//                                 />
//                             </Button>

//                             {selectedFile && (
//                                 <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.action.hover }}>
//                                     <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
//                                         <Box>
//                                             <Typography sx={{ fontWeight: 600 }}>
//                                                 {selectedFile.name}
//                                             </Typography>
//                                             <Typography variant="body2" color="primary">
//                                                 New File Ready for Upload
//                                             </Typography>
//                                         </Box>

//                                         <Stack direction="row" spacing={1}>
//                                             <Button
//                                                 variant="outlined"
//                                                 href={previewUrl}
//                                                 target="_blank"
//                                                 onClick={() => {
//                                                     if (previewUrl) {
//                                                         handlePreview(previewUrl);
//                                                     }
//                                                 }}
//                                             >
//                                                 Preview
//                                             </Button>
//                                             <Button
//                                                 color="error"
//                                                 variant="outlined"
//                                                 onClick={() => {
//                                                     setSelectedFile(null);
//                                                     setValue("attachment", undefined);
//                                                     setRemoveOldFile(false);
//                                                 }}
//                                             >
//                                                 Remove
//                                             </Button>
//                                         </Stack>
//                                     </Stack>
//                                 </Paper>
//                             )}
//                         </Stack>
//                     </form>
//                 </DialogContent>

//                 <DialogActions sx={{ p: 3 }}>
//                     <Button onClick={handelCancel}
//                         sx={{
//                             bgcolor: theme.palette.grey[200],
//                             color: theme.palette.text.primary,
//                             '&:hover': { bgcolor: theme.palette.grey[300] },
//                             width: 100,
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         form="subscription-form"
//                         disabled={isPending}
//                         sx={{
//                             bgcolor: theme.palette.primary.main,
//                             color: theme.palette.primary.contrastText,
//                             width: 130,
//                         }}
//                     >
//                         {isPending ? 'Saving...' : 'Save'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default EditTestResultDialog;




import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { LabResult } from "../../../Entities/Patient";
import { useEditTestResult } from "../../../Hook/UseEditTestResult";
import { editTestResultSchema, type EditTestResultInput } from "../../../Schema/EditTestResultSchema";
import { handlePreview } from "../../../Component/HandelPreviewFile";

interface Props {
    open: boolean;
    result: LabResult | null;
    medicalRecordId: number;
    patientId: number;
    onClose: () => void;
}

const EditTestResultDialog = ({ open, result, onClose, patientId, medicalRecordId }: Props) => {
    const [removeOldFile, setRemoveOldFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const theme = useTheme();

    const { mutate: editResult, isPending } = useEditTestResult(result?.id ?? 0, patientId);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<EditTestResultInput>({
        resolver: zodResolver(editTestResultSchema),
        mode: "onChange",
        defaultValues: {
            result: "",
        },
    });

    // إعادة ضبط الحالة عند فتح/إغلاق النافذة
    useEffect(() => {
        if (!open || !result) return;

        reset({
            result: result.result,
        });

        setSelectedFile(null);
        setRemoveOldFile(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [open, result, reset]);

    // معالجة معاينة الملف الجديد
    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedFile]);

    const handleRemoveFile = () => {
        editResult(
            { remove_attachment: true },
            {
                onSuccess: () => {
                    setSnackbar({
                        open: true,
                        message: "Attachment removed successfully",
                        severity: "success",
                    });
                    setRemoveOldFile(true);
                },
                onError: (error: any) => {
                    setSnackbar({
                        open: true,
                        message: error.response?.data?.message ?? "Failed to remove attachment",
                        severity: "error",
                    });
                },
            }
        );
    };

    const handelCancel = () => {
        reset();
        setSelectedFile(null);
        setRemoveOldFile(false);
        onClose();
    };

    const submitDialog = (data: EditTestResultInput) => {
        const formData = new FormData();

        // 1. إضافة النص
        formData.append("result", data.result);

        // 2. إضافة الملف الجديد
        if (selectedFile) {
            formData.append("attachment", selectedFile);
        }

        // 3. حالة حذف الملف القديم
        if (removeOldFile && !selectedFile) {
            formData.append("remove_attachment", "1");
        }

        // ملاحظة: إذا كان الـ Backend مَبني على Laravel، فك التشهير عن السطر التالي:
        // formData.append("_method", "PUT");

        editResult(formData, {
            onSuccess: (response) => {
                setSnackbar({
                    open: true,
                    message: response.message ?? "Updated successfully",
                    severity: "success",
                });
                onClose();
            },
            onError: (error: any) => {
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message ?? "Failed to update result",
                    severity: "error",
                });
            },
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.22)" },
                "& .MuiDialog-paper": {
                    width: { xs: "99vw", sm: 520, md: 620 },
                    maxWidth: "none",
                    backgroundImage: "none",
                    boxShadow: "none",
                },
            }}
        >
            <DialogTitle sx={{ fontSize: 17, fontWeight: 700, color: theme.palette.primary.main }}>
                Edit Test Result
            </DialogTitle>
            <DialogContent>
                <form
                    onSubmit={handleSubmit(submitDialog, (errors) => {
                        console.error("Form Validation Errors:", errors);
                    })}
                    id="subscription-form"
                >
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Typography sx={{ fontSize: 16, fontWeight: 550 }}>
                            Result Description
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            {...register("result")}
                            error={!!errors.result}
                            helperText={errors.result?.message}
                            multiline
                        />

                        {/* إظهار خطأ المرفق إن وجد في Zod */}
                        {errors.attachment && (
                            <Typography color="error" variant="caption">
                                {errors.attachment.message as string}
                            </Typography>
                        )}

                        {/* عرض الملف الحالي */}
                        {result?.attachment && !removeOldFile && !selectedFile && (
                            <Stack spacing={3} sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: 600 }}>Current Report</Typography>
                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <Stack spacing={0.5}>
                                            <Typography sx={{ fontWeight: 600 }}>{result?.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                PDF Document
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => result?.attachment && handlePreview(result.attachment)}
                                            >
                                                Preview
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                disabled={isPending}
                                                onClick={handleRemoveFile}
                                            >
                                                Remove
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Stack>
                        )}

                        <Divider />

                        {/* زر رفع ملف جديد */}
                        <Button
                            component="label"
                            variant="outlined"
                            fullWidth
                            sx={{ borderStyle: "dashed" }}
                        >
                            {selectedFile ? "Change PDF File" : "Upload New PDF"}
                            <input
                                ref={fileInputRef}
                                hidden
                                type="file"
                                accept="application/pdf"
                                onClick={(e) => {
                                    // تصفير القيمة لضمان عمل onChange حتى لو تم اختيار نفس الملف
                                    (e.target as HTMLInputElement).value = "";
                                }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setSelectedFile(file);
                                    setValue("attachment", file, { shouldValidate: true });
                                    setRemoveOldFile(true);
                                }}
                            />
                        </Button>

                        {/* معاينة الملف المرفوع الجديد */}
                        {selectedFile && (
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.action.hover }}>
                                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                    <Box>
                                        <Typography sx={{ fontWeight: 600 }}>{selectedFile.name}</Typography>
                                        <Typography variant="body2" color="primary">
                                            New File Ready for Upload
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1}>
                                        <Button variant="outlined" onClick={() => previewUrl && handlePreview(previewUrl)}>
                                            Preview
                                        </Button>
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                setValue("attachment", undefined, { shouldValidate: true });
                                                setRemoveOldFile(false);
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        )}
                    </Stack>
                </form>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button
                    onClick={handelCancel}
                    sx={{
                        bgcolor: theme.palette.grey[200],
                        color: theme.palette.text.primary,
                        "&:hover": { bgcolor: theme.palette.grey[300] },
                        width: 100,
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="subscription-form"
                    disabled={isPending}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: 130,
                    }}
                >
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTestResultDialog;