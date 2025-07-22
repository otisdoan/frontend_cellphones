import { Modal, type ModalProps } from "antd";

interface ModalCellphoneProps extends ModalProps {
  open: boolean;
}

const ModalCellphoneS = ({ children, ...props }: ModalCellphoneProps) => {
  return (
    <>
      <Modal {...props} footer={false}>
        {children}
      </Modal>
    </>
  );
};

export default ModalCellphoneS;
