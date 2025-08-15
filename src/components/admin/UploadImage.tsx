import {
  Image,
  Upload,
  type GetProp,
  type UploadFile,
  type UploadProps,
} from "antd";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface UploadResponse {
  message: string;
  status: string;
  data: { public_id: string; url: string };
}

const UploadImage = ({
  setImageApi,
  url,
}: {
  setImageApi: (image_url: string | undefined) => void;
  url?: string;
}) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onChange: UploadProps<UploadResponse>["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setImageApi(newFileList[0].response?.data.url);
    setFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item !== file));
  };

  useEffect(() => {
    setFileList(
      url
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: `${url}`,
            },
          ]
        : []
    );
  }, [url]);
  return (
    <>
      <Upload
        method="POST"
        action="http://localhost:3000/api/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={handlePreview}
        name="file"
        onRemove={handleRemove}
      >
        {fileList.length < 2 && "+ Upload"}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
