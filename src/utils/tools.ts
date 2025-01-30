/**
 * used to convert the server blob data to a video file
 * @param data the blob data sent by the server
 */
export const download = (data: Blob, fileName: string) => {
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
