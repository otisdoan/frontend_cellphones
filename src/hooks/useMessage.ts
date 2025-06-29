import { message } from "antd";

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccess = (content: string) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const showError = (content: string) => {
    messageApi.open({
      type: "error",
      content,
    });
  };

  return {
    contextHolder,
    showSuccess,
    showError,
  };
};
