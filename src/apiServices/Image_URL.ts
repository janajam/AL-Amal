// import noImage from '../assets/noImage.webp'
// const getCroppedImageUrl = (url: string) => {
//   if (!url) return noImage;
//   const target = "/media";
//   const index = url.indexOf(target) + target.length;
//   return url.slice(0, index) + "crop/600/400/" + url.slice(index);
// };

// export default getCroppedImageUrl;

import noImage from "../assets/noImage.webp";

const getCroppedImageUrl = (url?: string | null) => {
    if (!url) {
        return noImage;
    }

    const target = "/media";
    const index = url.indexOf(target);

    // إذا كانت الصورة موجودة ولكن لا تحتوي /media
    if (index === -1) {
        return url;
    }

    const mediaEnd = index + target.length;

    return (
        url.slice(0, mediaEnd) +
        "/crop/600/400" +
        url.slice(mediaEnd)
    );
};

export default getCroppedImageUrl;