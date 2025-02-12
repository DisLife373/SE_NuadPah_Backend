export const genFileName = (originalName: string): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มที่ 0 → ต้อง +1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const lastDotIndex = originalName.lastIndexOf(".");
  const baseName =
    lastDotIndex !== -1 ? originalName.slice(0, lastDotIndex) : originalName;
  const extension = lastDotIndex !== -1 ? originalName.slice(lastDotIndex) : "";

  return `${baseName}_${year}${month}${day}_${hours}${minutes}${seconds}${extension}`;
};
